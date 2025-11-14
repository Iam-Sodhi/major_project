import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

const AdminAppointments = () => {
    const { backendUrl, adminToken } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                if (data.success) setAppointments(data.appointments);
                else toast.error(data.message);
            } catch (err) {
                toast.error(err.message);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Appointments</h2>
            <table className="min-w-full border">
                <thead>
                    <tr className="border-b">
                        <th>Doctor ID</th>
                        <th>Patient ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Cancelled</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt._id} className="border-b">
                            <td>{appt.docId}</td>
                            <td>{appt.userId}</td>
                            <td>{appt.slotDate}</td>
                            <td>{appt.slotTime}</td>
                            <td>{appt.cancelled ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAppointments;
