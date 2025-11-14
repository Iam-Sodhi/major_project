import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

const AdminDoctors = () => {
    const { backendUrl, adminToken } = useContext(AppContext);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/admin/allDoctors`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                if (data.success) setDoctors(data.doctors);
                else toast.error(data.message);
            } catch (err) {
                toast.error(err.message);
            }
        };
        fetchDoctors();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Doctors</h2>
            <table className="min-w-full border">
                <thead>
                    <tr className="border-b">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Speciality</th>
                        <th>Degree</th>
                        <th>Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doc) => (
                        <tr key={doc._id} className="border-b">
                            <td>{doc.name}</td>
                            <td>{doc.email}</td>
                            <td>{doc.speciality}</td>
                            <td>{doc.degree}</td>
                            <td>{doc.experience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDoctors;
