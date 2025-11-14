import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../pages/Layout.jsx";
import { Camera, Save, Edit } from "lucide-react";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); // selected file

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
        `${backendUrl}/api/user/updateProfiledata`,
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
        </div>
      </div>
    </Layout>
                    
  );
}

export default Profile;