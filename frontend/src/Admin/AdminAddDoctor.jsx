import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";

const specialties = [
  "Medical Dermatology",
  "Pediatric Dermatology",
  "Cosmetic Dermatology",
  "Mohs Surgery",
  "Immunodermatology",
  "Teledermatology",
];

const AdminAddDoctor = () => {
  const { backendUrl, adminToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: specialties[0],
    degree: "",
    experience: "",
    about: "",
    fees: "",
    city: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setFormData({ ...formData, image: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      const res = await axios.post(`${backendUrl}/api/admin/addDoctor`, data, {
        headers: { Authorization: `Bearer ${adminToken}`, "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          speciality: specialties[0],
          degree: "",
          experience: "",
          about: "",
          fees: "",
          city: "",
          image: null,
        });
        window.location.reload();
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 border p-4 rounded">
      {["name", "email", "password", "degree", "experience", "about", "fees", "city"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      ))}

      <select
        name="speciality"
        value={formData.speciality}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        {specialties.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <input type="file" name="image" accept="image/*" onChange={handleChange} required className="border p-2 rounded" />

      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Add Doctor
      </button>
    </form>
  );
};

export default AdminAddDoctor;
