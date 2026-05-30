import axios from 'axios';
import FormData from 'form-data';
import marketplaceModel from '../models/marketplaceModel.js';

const uploadToIPFS = async (data) => {
    const formData = new FormData();
    const buffer = Buffer.from(JSON.stringify(data));
    formData.append('file', buffer, { filename: 'data.json', contentType: 'application/json' });

    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
            ...formData.getHeaders(),
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
    });

    return res.data.IpfsHash;
};

const createListing = async (req, res) => {
    try {
        const { userId } = req.body;
        const { disease, ageRange, gender, location, description, priceInTON, fullData, imageHash } = req.body;

        if (!disease || !ageRange || !gender || !location || !description || !priceInTON || !fullData) {
            return res.json({ success: false, message: 'Missing required fields' });
        }

        const ipfsHash = await uploadToIPFS({ disease, ageRange, gender, location, ...fullData });

        const listing = new marketplaceModel({
            sellerId: userId,
            disease,
            ageRange,
            gender,
            location,
            description,
            priceInTON: Number(priceInTON),
            ipfsHash,
            imageHash: imageHash || '',
        });

        await listing.save();
        res.json({ success: true, message: 'Data listed on marketplace', listing });
    } catch (err) {
        console.error('createListing error:', err.message);
        res.json({ success: false, message: err.message });
    }
};

const getListings = async (req, res) => {
    try {
        const listings = await marketplaceModel
            .find({ status: 'active' })
            .select('-ipfsHash -buyers')
            .sort({ createdAt: -1 });

        res.json({ success: true, listings });
    } catch (err) {
        console.error('getListings error:', err.message);
        res.json({ success: false, message: err.message });
    }
};

const purchaseListing = async (req, res) => {
    try {
        const { userId } = req.body;
        const { listingId, txHash } = req.body;

        if (!listingId || !txHash) {
            return res.json({ success: false, message: 'Missing listingId or txHash' });
        }

        const listing = await marketplaceModel.findById(listingId);
        if (!listing) return res.json({ success: false, message: 'Listing not found' });
        if (listing.status === 'sold') return res.json({ success: false, message: 'Already sold' });
        if (listing.sellers === userId) return res.json({ success: false, message: 'Cannot buy your own listing' });

        const alreadyBought = listing.buyers.some((b) => b.txHash === txHash);
        if (alreadyBought) return res.json({ success: false, message: 'Transaction already recorded' });

        listing.buyers.push({ buyerId: userId, txHash, purchasedAt: Date.now() });
        await listing.save();

        res.json({
            success: true,
            message: 'Purchase recorded',
            ipfsHash: listing.ipfsHash,
            ipfsUrl: `https://gateway.pinata.cloud/ipfs/${listing.ipfsHash}`,
        });
    } catch (err) {
        console.error('purchaseListing error:', err.message);
        res.json({ success: false, message: err.message });
    }
};

const myListings = async (req, res) => {
    try {
        const { userId } = req.body;
        const listings = await marketplaceModel.find({ sellerId: userId }).sort({ createdAt: -1 });
        res.json({ success: true, listings });
    } catch (err) {
        console.error('myListings error:', err.message);
        res.json({ success: false, message: err.message });
    }
};

const myPurchases = async (req, res) => {
    try {
        const { userId } = req.body;
        const listings = await marketplaceModel.find({ 'buyers.buyerId': userId }).sort({ createdAt: -1 });

        const result = listings.map((l) => ({
            _id: l._id,
            disease: l.disease,
            ageRange: l.ageRange,
            gender: l.gender,
            location: l.location,
            description: l.description,
            ipfsUrl: `https://gateway.pinata.cloud/ipfs/${l.ipfsHash}`,
        }));

        res.json({ success: true, purchases: result });
    } catch (err) {
        console.error('myPurchases error:', err.message);
        res.json({ success: false, message: err.message });
    }
};

export { createListing, getListings, purchaseListing, myListings, myPurchases };
