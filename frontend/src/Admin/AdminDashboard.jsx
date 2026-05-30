import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";
import AdminAddDoctor from "./AdminAddDoctor.jsx";
import AdminDoctors from "./AdminDoctors.jsx";
import AdminAppointments from "./AdminAppointments.jsx";

const AdminDashboard = () => {
  const { backendUrl, adminToken } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const loadDashboardData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (data.success) {
        setDashboardData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (!adminToken) return <p className="text-center mt-10">Not authorized</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {dashboardData && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded">Doctors: {dashboardData.doctors}</div>
          <div className="p-4 border rounded">Patients: {dashboardData.patients}</div>
          <div className="p-4 border rounded">Appointments: {dashboardData.appointments}</div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Doctor</h2>
        <AdminAddDoctor />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Doctors</h2>
        <AdminDoctors />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Appointments</h2>
        <AdminAppointments />
      </div>
    </div>
  );
};

export default AdminDashboard;
