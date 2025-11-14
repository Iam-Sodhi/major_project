import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../pages/Layout.jsx";
import { Video, CreditCard, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

function AllAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const navigate = useNavigate();

  const slotFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    const day = dateArray[0];
    const monthIndex = Number(dateArray[1]);
    const year = dateArray[2];
    return `${day} ${months[monthIndex]} ${year}`;
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancelAppointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        toast.success(data.message);
        listAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const listAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/listAppointments",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        console.log("Couldn't find appointments");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isTimeForVideoCall = (appointmentTime) => {
    const currentTime = new Date();
    const appointmentDate = new Date(appointmentTime);
    return currentTime >= appointmentDate;
  };

  const handlePayment = () => {
    setPaymentStatus(true)
  };

  useEffect(() => {
    if (token) listAppointments();
  }, [token]);

  const AppointmentCard = ({ item }) => {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Doctor Image */}
          <div className="sm:w-40 w-full">
            <img
              className="w-full h-40 rounded-lg object-cover bg-[#C9D8FF]"
              src={item.docData.image}
              alt={item.docData.name}
            />
          </div>

          {/* Appointment Details */}
          <div className="flex-1 space-y-4">
            {/* Doctor Info with Status Tag */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">
                  {item.docData.name}
                </h3>
                <p className="text-sm text-gray-500">{item.docData.speciality}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.cancelled 
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {item.cancelled ? 'Cancelled' : 'Active'}
              </span>
            </div>

            {/* Address */}
            <div>
              <p className="font-medium text-gray-700">Location</p>
              <p className="text-sm text-gray-600">{item.docData.address.line1}</p>
              <p className="text-sm text-gray-600">{item.docData.address.line2}</p>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {slotFormat(item.slotDate)} | {item.slotTime}
              </div>
            </div>

            {/* Action Buttons */}
            {!item.cancelled && (
              <div className="flex flex-wrap gap-3">
                {isTimeForVideoCall(item.slotDate + " " + item.slotTime) && (
                  <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                    <Video className="h-4 w-4" />
                    Join Video Call
                  </button>
                )}
                {
                  !paymentStatus ? (
                    <button className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600" onClick={() => handlePayment()}>
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </button> ) : (
                  <button className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600" onClick={() => navigate("/video-call")}>
                  <CreditCard className="h-4 w-4" />
                  Launch Meet
                </button>
                )
                }
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-red-500 transition-colors hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };


  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-charcoal mb-4">
              My Appointments
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage your upcoming and past appointments with healthcare providers.
            </p>
          </div>

          <div className="space-y-6">
            {appointments.map((item, index) => (
              <AppointmentCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllAppointments;
