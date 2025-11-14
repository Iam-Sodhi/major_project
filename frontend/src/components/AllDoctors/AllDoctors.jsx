import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Layout from "../../pages/Layout";
import { Filter } from "lucide-react";

const SpecialtyButton = ({ name, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`mb-2 w-full cursor-pointer rounded-lg border px-4 py-3 text-left transition-all hover:bg-gray-50 
        ${isActive ? "border-purple-200 bg-purple-50 text-purple-700" : "border-gray-200 text-gray-700"}`}
    >
      {name}
    </button>
  );
};

const DoctorCard = ({ doctor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <img
        src={doctor.image}
        alt={doctor.name}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              doctor.available ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span
            className={`text-xs font-medium ${
              doctor.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {doctor.available ? "Available" : "Not Available"}
          </span>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.speciality}</p>
        </div>
      </div>
    </div>
  );
};

function AllDoctors() {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setfilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const specialties = [
    "Medical Dermatology",
    "Pediatric Dermatology",
    "Cosmetic Dermatology",
    "Mohs Surgery",
    "Immunodermatology",
    "Teledermatology"
  ];

  const applyFilter = () => {
    if (speciality) {
      setfilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Find Your Specialist
            </h1>
            <p className="text-lg text-gray-600">
              Browse through our network of experienced dermatology specialists.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters Section */}
            <div className="lg:w-64">
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <button
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
                  onClick={() => setShowFilter((prev) => !prev)}
                >
                  <Filter className="h-4 w-4" />
                  {showFilter ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              <div className={`${showFilter ? "block" : "hidden"} lg:block`}>
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Specialties</h2>
                <div className="space-y-2">
                  {specialties.map((specialty) => (
                    <SpecialtyButton
                      key={specialty}
                      name={specialty}
                      isActive={speciality === specialty}
                      onClick={() =>
                        speciality === specialty
                          ? navigate("/all-doctors")
                          : navigate(`/all-doctors/${specialty}`)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="flex-1 overflow-y-scroll h-[500px]">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filterDoc.map((doctor) => (
                  <DoctorCard
                    key={doctor._id}
                    doctor={doctor}
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllDoctors;