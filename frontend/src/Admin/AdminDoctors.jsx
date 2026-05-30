import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";

const AdminDoctors = () => {
  const { backendUrl, adminToken } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/allDoctors`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { loadDoctors(); }, []);

  if (!adminToken) return <p className="text-center mt-10">Not authorized</p>;

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Speciality</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doc => (
            <tr key={doc._id} className="border-b">
              <td className="p-2">{doc.name}</td>
              <td className="p-2">{doc.email}</td>
              <td className="p-2">{doc.speciality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDoctors;
