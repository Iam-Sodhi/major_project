import React from 'react';
import { assets } from '../../assets/assets_frontend/assets.js';
import Navbar from '../Navbar.jsx'
import Footer from '../landingPage/Footer.jsx'

function ContactUs() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-charcoal mb-4">Contact <span className='font-semibold'>Us</span></h1>
        <p className="text-gray-600">We're here to help! Get in touch with our team for any inquiries or support.</p>
      </div>

      <div className="flex flex-col items-center gap-8 mt-12 sm:flex-row sm:justify-center">
        <img
          className="w-full max-w-xs sm:max-w-sm object-cover rounded-lg shadow-md"
          src={assets.contact_image}
          alt="Contact Us"
        />

        <div className="text-gray-700 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-charcoal">Our Office</h2>
            <p className="text-sm mt-2">
              54709 Willms Station<br />
              Suite 350, Washington, USA
            </p>
            <p className="text-sm mt-2">
              Tel: (415) 555‑0132<br />
              Email: <a href="mailto:greatstackdev@gmail.com" className="text-primary underline">greatstackdev@gmail.com</a>
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-charcoal">Careers at Prescripto</h2>
            <p className="text-sm mt-2">
              Learn more about our teams and job openings. We’re always looking for talented individuals to join us!
            </p>
            <button className="mt-4 px-4 py-2 border border-charcoal text-charcoal rounded-md text-sm transition-colors hover:bg-charcoal hover:text-white">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ContactUs;
