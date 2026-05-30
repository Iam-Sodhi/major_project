import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    buyerId: { type: String, required: true },
    txHash: { type: String, required: true },
    purchasedAt: { type: Number, default: Date.now }
});

const marketplaceSchema = new mongoose.Schema({
    sellerId: { type: String, required: true },
    disease: { type: String, required: true },
    ageRange: { type: String, required: true },
    gender: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    priceInTON: { type: Number, required: true },
    ipfsHash: { type: String, required: true },
    status: { type: String, enum: ['active', 'sold'], default: 'active' },
    buyers: { type: [purchaseSchema], default: [] },
    createdAt: { type: Number, default: Date.now }
});

const marketplaceModel = mongoose.models.marketplace || mongoose.model('marketplace', marketplaceSchema);

export default marketplaceModel;
