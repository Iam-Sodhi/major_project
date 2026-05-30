import React, { useContext, useEffect, useState } from "react";
import { Mail, ShoppingCart, Wallet, ExternalLink, Filter } from "lucide-react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { toNano } from "@ton/core";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./Layout";
import { AppContext } from "../context/AppContext";

const PROJECT_WALLET = "UQBvI0aFLnw2QbZgjMPCLRdtRHxhUyinQudg6sdiohIwg5jL";

const PatientCard = ({ listing, onBuy, isPurchased }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">ID: {listing._id.slice(-6).toUpperCase()}</p>
          <p className="text-sm text-gray-600 mt-1">Age: {listing.ageRange} · {listing.gender}</p>
          <p className="text-sm text-gray-600">Location: {listing.location}</p>
        </div>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
          {listing.disease}
        </span>
      </div>

      <p className="mb-4 text-sm text-gray-700">{listing.description}</p>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg font-bold text-charcoal">{listing.priceInTON} TON</span>
        <span className="text-xs text-gray-400">≈ anonymized research dataset</span>
      </div>

      <div className="flex gap-3">
        {isPurchased ? (
          <a
            href={listing.ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            <ExternalLink className="h-4 w-4" />
            View Data (IPFS)
          </a>
        ) : (
          <button
            onClick={() => onBuy(listing)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-charcoal px-4 py-2 text-white transition-colors hover:bg-opacity-90"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Data ({listing.priceInTON} TON)
          </button>
        )}
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-charcoal px-4 py-2 text-charcoal transition-colors hover:bg-gray-50">
          <Mail className="h-4 w-4" />
          Contact
        </button>
      </div>
    </div>
  );
};

const BuyingPage = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState({});
  const [loading, setLoading] = useState(true);
  const [diseaseFilter, setDiseaseFilter] = useState("All");
  const [buying, setBuying] = useState(null);

  const diseases = ["All", ...new Set(listings.map((l) => l.disease))];

  const fetchListings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/marketplace/listings`);
      if (data.success) setListings(data.listings);
    } catch (err) {
      toast.error("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPurchases = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/marketplace/mypurchases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const map = {};
        data.purchases.forEach((p) => { map[p._id] = p.ipfsUrl; });
        setPurchases(map);
      }
    } catch (_) {}
  };

  useEffect(() => {
    fetchListings();
    fetchMyPurchases();
  }, [token]);

  const handleBuy = async (listing) => {
    if (!wallet) {
      toast.info("Please connect your TON wallet first");
      tonConnectUI.openModal();
      return;
    }

    setBuying(listing._id);
    try {
      const tx = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 120,
        messages: [
          {
            address: PROJECT_WALLET,
            amount: toNano(listing.priceInTON.toString()).toString(),
          },
        ],
      });

      const txHash = tx.boc;

      const { data } = await axios.post(
        `${backendUrl}/api/marketplace/purchase`,
        { listingId: listing._id, txHash },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Purchase successful! Data access granted.");
        setPurchases((prev) => ({ ...prev, [listing._id]: data.ipfsUrl }));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      if (err.message?.includes("User rejects")) {
        toast.info("Transaction cancelled");
      } else {
        toast.error("Purchase failed: " + (err.message || "Unknown error"));
      }
    } finally {
      setBuying(null);
    }
  };

  const filtered = diseaseFilter === "All" ? listings : listings.filter((l) => l.disease === diseaseFilter);

  return (
    <Layout>
      <div className="col-span-10 row-span-10 min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-charcoal">Patient Data Marketplace</h1>
              <p className="max-w-2xl text-gray-600">
                Browse and purchase anonymized patient data for research. All data is stored on IPFS and consented for research use.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {wallet ? (
                <div className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-green-700 text-sm">
                  <Wallet className="h-4 w-4" />
                  {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}
                </div>
              ) : (
                <button
                  onClick={() => tonConnectUI.openModal()}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700"
                >
                  <Wallet className="h-4 w-4" />
                  Connect TON Wallet
                </button>
              )}
            </div>
          </div>

          {/* Filter bar */}
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <Filter className="h-4 w-4 text-gray-500" />
            {diseases.map((d) => (
              <button
                key={d}
                onClick={() => setDiseaseFilter(d)}
                className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
                  diseaseFilter === d
                    ? "bg-charcoal text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">Loading listings...</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <ShoppingCart className="mb-4 h-12 w-12 opacity-30" />
              <p>No listings available yet.</p>
              <p className="text-sm mt-1">Patients can list their data from their Profile page.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => (
                buying === listing._id ? (
                  <div key={listing._id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm flex items-center justify-center min-h-[200px] text-gray-400">
                    Processing payment...
                  </div>
                ) : (
                  <PatientCard
                    key={listing._id}
                    listing={{ ...listing, ipfsUrl: purchases[listing._id] }}
                    onBuy={handleBuy}
                    isPurchased={!!purchases[listing._id]}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BuyingPage;
