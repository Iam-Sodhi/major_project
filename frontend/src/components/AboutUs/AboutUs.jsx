import React from 'react';
import { assets } from '../../assets/assets_frontend/assets.js';
import Navbar from '../Navbar.jsx'
import Footer from '../landingPage/Footer.jsx'

function AboutUs() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-3xl font-bold text-charcoal mb-4">About <span className="font-semibold">Us</span></h1>
        <p className="text-gray-600">Discover who we are and why Prescripto is your trusted healthcare partner.</p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center">
        <img
          className="w-full max-w-xs sm:max-w-sm object-cover rounded-lg shadow-md"
          src={assets.about_image}
          alt="About Us"
        />

        <div className="text-gray-700 space-y-4 text-sm max-w-lg">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
            At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments
            and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform,
            integrating the latest advancements to improve user experience and deliver superior service. Whether you're
            booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <h2 className="font-semibold text-lg text-charcoal mt-4">Our Vision</h2>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap
            between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-xl font-bold text-charcoal">Why <span className="font-semibold">Choose Us</span></h2>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-6">
        <div className="border rounded-lg p-6 flex-1 hover:bg-primary  transition-colors text-center shadow-sm">
          <h3 className="text-sm font-semibold">Efficiency</h3>
          <p className="text-xs mt-4">
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>

        <div className="border rounded-lg p-6 flex-1 hover:bg-primary  transition-colors text-center shadow-sm">
          <h3 className="text-sm font-semibold">Convenience</h3>
          <p className="text-xs mt-4">
            Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>

        <div className="border rounded-lg p-6 flex-1 hover:bg-primary transition-colors text-center shadow-sm">
          <h3 className="text-sm font-semibold">Personalization</h3>
          <p className="text-xs mt-4">
            Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  );
}

export default AboutUs;
