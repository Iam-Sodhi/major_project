import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { backendUrl, adminToken } = useContext(AppContext);
    const [dashData, setDashData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminToken) return;

        const fetchDashboard = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                if (data.success) {
                    setDashData(data.dashData);
                } else toast.error(data.message);
            } catch (err) {
                toast.error(err.message);
            }
        };
        fetchDashboard();
    }, [adminToken]);

    if (!dashData) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded">
                    <p className="text-gray-500">Doctors</p>
                    <p className="text-xl font-bold">{dashData.doctors}</p>
                </div>
                <div className="p-4 border rounded">
                    <p className="text-gray-500">Patients</p>
                    <p className="text-xl font-bold">{dashData.patients}</p>
                </div>
                <div className="p-4 border rounded">
                    <p className="text-gray-500">Appointments</p>
                    <p className="text-xl font-bold">{dashData.appointments}</p>
                </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold">Latest Appointments</h3>
            <ul className="mt-2">
                {dashData.latestAppointments.map((appt) => (
                    <li key={appt._id} className="border p-2 rounded my-1">
                        {appt.docId} - {appt.slotDate} {appt.slotTime} - {appt.cancelled ? 'Cancelled' : 'Active'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
