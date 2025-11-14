import React from "react";
import { Mail, ShoppingCart } from "lucide-react";
import Layout from "./Layout";

const PatientCard = ({ patient }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-charcoal">
            {patient.name}
          </h3>
          <p className="text-sm text-gray-500">Patient ID: {patient.id}</p>
        </div>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
          {patient.disease}
        </span>
      </div>

      <div className="mb-6 space-y-3">
        <div>
          <p className="text-sm text-gray-600">Age: {patient.age}</p>
          <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
          <p className="text-sm text-gray-600">Location: {patient.location}</p>
        </div>
        <p className="text-sm text-gray-700">{patient.description}</p>
      </div>

      <div className="flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-charcoal px-4 py-2 text-white transition-colors hover:bg-opacity-90">
          <ShoppingCart className="h-4 w-4" />
          Buy Data
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-charcoal px-4 py-2 text-charcoal transition-colors hover:bg-gray-50">
          <Mail className="h-4 w-4" />
          Contact
        </button>
      </div>
    </div>
  );
};

const BuyingPage = () => {
  const patients = [
    {
      id: "P1001",
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      location: "New York, USA",
      disease: "Eczema",
      description:
        "Chronic eczema case with recent improvements through experimental treatment. Detailed medical history and treatment response data available.",
    },
    {
      id: "P1002",
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      location: "Toronto, Canada",
      disease: "Psoriasis",
      description:
        "Moderate to severe psoriasis with documented response to biological therapy. Includes genetic testing results.",
    },
    {
      id: "P1003",
      name: "Emma Wilson",
      age: 28,
      gender: "Female",
      location: "London, UK",
      disease: "Rosacea",
      description:
        "Early-onset rosacea with unusual presentation. Complete documentation of triggers and treatment efficacy.",
    },
    {
      id: "P1004",
      name: "James Martinez",
      age: 52,
      gender: "Male",
      location: "Miami, USA",
      disease: "Melanoma",
      description:
        "Successfully treated early-stage melanoma. Includes detailed imaging history and post-treatment monitoring data.",
    },
    {
      id: "P1005",
      name: "Lisa Taylor",
      age: 41,
      gender: "Female",
      location: "Sydney, Australia",
      disease: "Acne",
      description:
        "Severe cystic acne case with comprehensive treatment history and hormone level data.",
    },
    {
      id: "P1006",
      name: "David Kim",
      age: 37,
      gender: "Male",
      location: "Seoul, South Korea",
      disease: "Vitiligo",
      description:
        "Progressive vitiligo with documented response to phototherapy. Includes detailed progression photos.",
    },
  ];

  return (
    <Layout>
      <div className="col-span-10 row-span-10 min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-charcoal">
              Patient Data Marketplace
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600">
              Browse and purchase anonymized patient data for research purposes.
              All data has been properly consented for research use.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyingPage;
