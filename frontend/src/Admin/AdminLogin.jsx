import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { backendUrl, setAdminToken } = useContext(AppContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                setAdminToken(data.token);
                toast.success('Admin logged in');
                navigate('/admin');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
