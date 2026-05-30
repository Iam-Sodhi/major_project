import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../pages/Layout.jsx";
import { Camera, Save, Edit, Database, Plus, ExternalLink } from "lucide-react";

const SKIN_CONDITIONS = [
  "Actinic Keratosis",
  "Basal Cell Carcinoma",
  "Benign Keratosis",
  "Dermatofibroma",
  "Melanoma",
  "Melanocytic Nevi",
  "Vascular Lesion",
];

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const [showListForm, setShowListForm] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [listForm, setListForm] = useState({
    disease: "Actinic Keratosis", ageRange: "18-25", gender: "Male",
    location: "", description: "", priceInTON: "0.1",
    fullData: { symptoms: "", treatmentHistory: "", medications: "" },
  });
  const [skinImage, setSkinImage] = useState(null);
  const [listing, setListing] = useState(false);

  const { backendUrl, userData, setUserData, token, loadUserProfileData } =
    useContext(AppContext);

  const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
  const pinataApiSecret = import.meta.env.VITE_PINATA_API_SECRET;

  const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  // -----------------------
  // ✔ Correct Pinata upload
  // -----------------------
  const uploadToPinata = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await axios.post(pinataEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret,
        },
      });

      return res.data.IpfsHash; // SUCCESS
    } catch (err) {
      console.error("Pinata error:", err);
      toast.error("Failed to upload image");
      return null;
    }
  };

  // -------------------------------
  // ✔ Update user profile function
  // -------------------------------
  const updateUserProfileData = async () => {
    try {
      let imageUrl = userData.image;

      // ✔ If user selected new image, upload
      if (image) {
        const ipfsHash = await uploadToPinata(image);
        if (ipfsHash) {
          imageUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        }
      }

      const updatedUser = {
        ...userData,
        image: imageUrl,
      };

      const { data } = await axios.put(
        `${backendUrl}/api/user/updateProfileData`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = () => setIsEdit(!isEdit);

  const fetchMyListings = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/marketplace/mylistings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setMyListings(data.listings);
    } catch (_) {}
  };

  useEffect(() => { fetchMyListings(); }, [token]);

  const handleListData = async (e) => {
    e.preventDefault();
    if (!listForm.location || !listForm.description) {
      return toast.error("Please fill all required fields");
    }
    setListing(true);
    try {
      let imageHash = "";
      if (skinImage) {
        imageHash = await uploadToPinata(skinImage);
        if (!imageHash) { setListing(false); return; }
      }

      const { data } = await axios.post(
        `${backendUrl}/api/marketplace/list`,
        { ...listForm, imageHash },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Data listed on marketplace!");
        setShowListForm(false);
        setSkinImage(null);
        setListForm({ disease: "Actinic Keratosis", ageRange: "18-25", gender: "Male", location: "", description: "", priceInTON: "0.1", fullData: { symptoms: "", treatmentHistory: "", medications: "" } });
        fetchMyListings();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to list data");
    } finally {
      setListing(false);
    }
  };

  return (
    
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-charcoal">User Profile</h1>
            <p className="mx-auto max-w-2xl text-gray-600">
              Manage your personal information and account details
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            {/* Profile Image Card */}
            <div className="md:col-span-4">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    {isEdit ? (
                      <label htmlFor="image" className="cursor-pointer">
                        <div className="relative">
                          <img
                            className="h-32 w-32 rounded-full object-cover"
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt="Profile"
                          />
                          <div className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg">
                            <Camera className="h-5 w-5 text-gray-600" />
                          </div>
                        </div>
                        <input
                          type="file"
                          id="image"
                          onChange={(e) => setImage(e.target.files[0])}
                          hidden
                        />
                      </label>
                    ) : (
                      <img
                        className="h-32 w-32 rounded-full object-cover"
                        src={userData.image}
                        alt="Profile"
                      />
                    )}
                  </div>

                  {isEdit ? (
                    <input
                      className="mb-4 w-full rounded-lg border border-gray-200 p-2 text-center text-lg font-medium"
                      type="text"
                      name="name"
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      value={userData.name || ""}
                    />
                  ) : (
                    <h2 className="mb-4 text-xl font-semibold">{userData.name}</h2>
                  )}

                  <button
                    onClick={isEdit ? updateUserProfileData : handleEdit}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-charcoal px-4 py-2 text-white transition-colors hover:bg-opacity-90"
                  >
                    {isEdit ? (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details Card */}
            <div className="md:col-span-8">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                {/* Basic Information Section */}
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-semibold text-charcoal">
                    Basic Information
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-600">
                        Birthdate
                      </label>
                      {isEdit ? (
                        <input
                          type="date"
                          className="w-full rounded-lg border border-gray-200 p-2"
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, dob: e.target.value }))
                          }
                          value={userData.dob || ""}
                        />
                      ) : (
                        <p className="rounded-lg border border-gray-200 p-2 text-gray-700">
                          {userData.dob}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-600">
                        Gender
                      </label>
                      {isEdit ? (
                        <select
                          className="w-full rounded-lg border border-gray-200 p-2"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                          value={userData.gender || ""}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        <p className="rounded-lg border border-gray-200 p-2 text-gray-700">
                          {userData.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-charcoal">
                    Contact Information
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <p className="rounded-lg border border-gray-200 p-2 text-gray-700">
                        {userData.email}
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-600">
                        Phone
                      </label>
                      {isEdit ? (
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-200 p-2"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          value={userData.phone || ""}
                        />
                      ) : (
                        <p className="rounded-lg border border-gray-200 p-2 text-gray-700">
                          {userData.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Data Marketplace Section */}
          <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-600" />
                <h3 className="text-xl font-semibold text-charcoal">Data Marketplace</h3>
              </div>
              <button
                onClick={() => setShowListForm(!showListForm)}
                className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
                List My Data
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-500">
              Anonymize and sell your medical data to researchers. You control what you share and set your own price in TON.
            </p>

            {showListForm && (
              <form onSubmit={handleListData} className="mb-6 rounded-lg border border-purple-100 bg-purple-50 p-4 space-y-3">
                <h4 className="font-medium text-purple-800">New Listing</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Condition</label>
                    <select className="w-full rounded border border-gray-200 p-2 text-sm"
                      value={listForm.disease} onChange={(e) => setListForm(p => ({ ...p, disease: e.target.value }))}>
                      {SKIN_CONDITIONS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Age Range</label>
                    <select className="w-full rounded border border-gray-200 p-2 text-sm"
                      value={listForm.ageRange} onChange={(e) => setListForm(p => ({ ...p, ageRange: e.target.value }))}>
                      {["18-25","26-35","36-45","46-55","56-65","65+"].map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Gender</label>
                    <select className="w-full rounded border border-gray-200 p-2 text-sm"
                      value={listForm.gender} onChange={(e) => setListForm(p => ({ ...p, gender: e.target.value }))}>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Location (region/country)</label>
                    <input className="w-full rounded border border-gray-200 p-2 text-sm" placeholder="e.g. Mumbai, India"
                      value={listForm.location} onChange={(e) => setListForm(p => ({ ...p, location: e.target.value }))} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Price (TON)</label>
                    <input type="number" step="0.01" min="0.01" className="w-full rounded border border-gray-200 p-2 text-sm"
                      value={listForm.priceInTON} onChange={(e) => setListForm(p => ({ ...p, priceInTON: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Skin Image (optional)</label>
                  <label htmlFor="skin-image" className="cursor-pointer">
                    <div className="flex items-center gap-3 rounded border border-dashed border-purple-300 bg-white p-3 hover:bg-purple-50">
                      {skinImage ? (
                        <img src={URL.createObjectURL(skinImage)} className="h-16 w-16 rounded object-cover" alt="preview" />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-purple-50">
                          <Camera className="h-6 w-6 text-purple-300" />
                        </div>
                      )}
                      <span className="text-xs text-gray-500">
                        {skinImage ? skinImage.name : "Upload skin lesion image (JPG, PNG)"}
                      </span>
                    </div>
                    <input type="file" id="skin-image" accept="image/*" hidden
                      onChange={(e) => setSkinImage(e.target.files[0] || null)} />
                  </label>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Public Description (no personal info)</label>
                  <textarea className="w-full rounded border border-gray-200 p-2 text-sm" rows={2} placeholder="Brief anonymized summary..."
                    value={listForm.description} onChange={(e) => setListForm(p => ({ ...p, description: e.target.value }))} />
                </div>
                <h5 className="text-xs font-semibold text-gray-600 pt-1">Private Data (stored encrypted on IPFS)</h5>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">Symptoms</label>
                    <input className="w-full rounded border border-gray-200 p-2 text-sm" placeholder="Main symptoms..."
                      value={listForm.fullData.symptoms} onChange={(e) => setListForm(p => ({ ...p, fullData: { ...p.fullData, symptoms: e.target.value } }))} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">Treatment History</label>
                    <input className="w-full rounded border border-gray-200 p-2 text-sm" placeholder="Treatments tried..."
                      value={listForm.fullData.treatmentHistory} onChange={(e) => setListForm(p => ({ ...p, fullData: { ...p.fullData, treatmentHistory: e.target.value } }))} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-500">Medications</label>
                    <input className="w-full rounded border border-gray-200 p-2 text-sm" placeholder="Current medications..."
                      value={listForm.fullData.medications} onChange={(e) => setListForm(p => ({ ...p, fullData: { ...p.fullData, medications: e.target.value } }))} />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={listing}
                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 disabled:opacity-60">
                    {listing ? "Uploading to IPFS..." : "Submit Listing"}
                  </button>
                  <button type="button" onClick={() => setShowListForm(false)}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {myListings.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-600">My Listings</h4>
                {myListings.map((l) => (
                  <div key={l._id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                    <div>
                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">{l.disease}</span>
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${l.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{l.status}</span>
                      <p className="mt-1 text-xs text-gray-500">{l.priceInTON} TON · {l.buyers?.length || 0} purchase(s)</p>
                    </div>
                    <a href={`https://gateway.pinata.cloud/ipfs/${l.ipfsHash}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-blue-500 hover:underline">
                      IPFS <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No listings yet. Click "List My Data" to get started.</p>
            )}
          </div>

        </div>
      </div>
    </Layout>

  );

}

export default Profile;