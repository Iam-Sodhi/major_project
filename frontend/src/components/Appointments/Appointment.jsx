import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Calendar, Check, Clock, Info, MapPin, Medal } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../pages/Layout";
import RelatedDoctors from "./RelatedDoctors";

const DateSlot = ({ date, isSelected, onClick }) => {
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  return (
    <button
      onClick={onClick}
      className={`flex h-20 w-20 flex-col items-center justify-center rounded-xl border transition-all
        ${
          isSelected
            ? "border-purple-300 bg-purple-50 text-purple-700"
            : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
        }`}
    >
      <span className="text-sm font-medium">{dayOfWeek[date.getDay()]}</span>
      <span className="mt-1 text-xl font-bold">{date.getDate()}</span>
      <span className="text-xs text-gray-500">
        {date.toLocaleString('default', { month: 'short' })}
      </span>
    </button>
  );
};

const TimeSlot = ({ time, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-4 py-2 transition-all
        ${
          isSelected
            ? "border-purple-300 bg-purple-50 text-purple-700"
            : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
        }`}
    >
      <span className="text-sm font-medium">{time}</span>
    </button>
  );
};

function Appointments() {
  const { docId } = useParams();
  const [doc, setDoc] = useState({});
  const [docSlot, setDocSlot] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  // Find the doctor data by ID
  const findDoc = () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    if (doctor) setDoc(doctor);
  };

  // Get available slots for the next 7 days
  const getAvailableSlots = async () => {
    setDocSlot([]);
    let today = new Date();
    let startHour = 10;
    let endHour = 21;

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(startHour, 0, 0, 0);
      let timeSlots = [];

      while (currentDate.getHours() < endHour) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const isSlotAvailable =
          !doc.slots_booked?.[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  // Book appointment handler
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      return navigate("/login");
    }
    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }
    try {
      const date = docSlot[slotIdx][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const { data } = await axios.post(
        `${backendUrl}/api/user/bookAppointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    findDoc();
  }, [doctors, docId]);

  useEffect(() => {
    if (doc) getAvailableSlots();
  }, [doc]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl bg-white p-6 shadow-sm lg:p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Doctor Profile Section */}
              <div className="lg:col-span-1">
                <div className="overflow-hidden rounded-xl">
                  <img
                    className="h-64 w-full object-cover"
                    src={doc.image}
                    alt={doc.name}
                  />
                </div>
              </div>

              {/* Doctor Information Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">{doc.name}</h1>
                  <Check className="h-5 w-5 text-blue-500" />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                    {doc.speciality}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Medal className="h-4 w-4" />
                    {doc.degree}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {doc.experience} years experience
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-400" />
                    <h2 className="text-lg font-semibold text-gray-900">About</h2>
                  </div>
                  <p className="mt-2 text-gray-600">{doc.about}</p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    Consultation Fee:
                  </span>
                  <span className="text-xl font-bold text-purple-600">
                    {currencySymbol}
                    {doc.fees}
                  </span>
                </div>
              </div>
            </div>

            {/* Appointment Booking Section */}
            <div className="mt-8 border-t pt-8">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Book an Appointment
              </h2>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4" />
                  Select Date
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {docSlot.map((slots, index) => (
                    slots[0] && (
                      <DateSlot
                        key={index}
                        date={slots[0].dateTime}
                        isSelected={slotIdx === index}
                        onClick={() => setSlotIdx(index)}
                      />
                    )
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4" />
                  Select Time
                </h3>
                <div className="flex flex-wrap gap-3">
                  {docSlot[slotIdx]?.map((slot, index) => (
                    <TimeSlot
                      key={index}
                      time={slot.time}
                      isSelected={slotTime === slot.time}
                      onClick={() => setSlotTime(slot.time)}
                    />
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => bookAppointment()}
                  className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Related Doctors Section */}
          <div className="mt-8">
            <RelatedDoctors docId={docId} speciality={doc.speciality} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Appointments;