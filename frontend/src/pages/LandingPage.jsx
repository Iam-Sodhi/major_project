import React from 'react'
import HeroSection from '../components/landingPage/HeroSection'
import Navbar from '../components/Navbar'
import Features from '../components/landingPage/Features'
import HowItWorks from '../components/landingPage/HowItWorks'
// import Benefits from '../components/landingPage/Benefits'
import Testimonials from '../components/landingPage/Testimonials'
import FAQs from '../components/landingPage/Faqs'
import CallToAction from '../components/landingPage/CallToAction'
import Footer from '../components/landingPage/Footer'

const LandingPage = () => {
  return (
    <div className='min-h-screen font-inter'>
        <Navbar />
        <HeroSection />
        <HowItWorks />
        <Features />
        {/* <Benefits /> */}
        <Testimonials />
        <FAQs />
        <CallToAction />
        <Footer />
    </div>
  )
}

export default LandingPage