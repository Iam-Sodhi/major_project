import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";

const AdminAppointments = () => {
  const { backendUrl, adminToken } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (data.success) setAppointments(data.appointments);
      else toast.error(data.message);
    } catch (err) { toast.error(err.message); }
  };

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/cancelAppointment`, { appointmentId: id }, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (data.success) {
        toast.success(data.message);
        loadAppointments();
      } else toast.error(data.message);
    } catch (err) { toast.error(err.message); }
  };

  useEffect(() => { loadAppointments(); }, []);

  if (!adminToken) return <p className="text-center mt-10">Not authorized</p>;

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Patient</th>
            <th className="p-2">Doctor ID</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Cancelled</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(app => (
            <tr key={app._id} className="border-b">
              <td className="p-2">{app.patientId}</td>
              <td className="p-2">{app.docId}</td>
              <td className="p-2">{app.slotDate}</td>
              <td className="p-2">{app.slotTime}</td>
              <td className="p-2">{app.cancelled ? "Yes" : "No"}</td>
              <td className="p-2">
                {!app.cancelled && <button onClick={() => cancelAppointment(app._id)} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
