import React from 'react'
import { Route,Routes,useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Profile from './components/Profile/Profile.jsx'
import PredictPage from './pages/PredictPage.jsx'
import AllDoctors from './components/AllDoctors/AllDoctors.jsx'
import Appointment from './components/Appointments/Appointment.jsx'
import AllAppointments from './components/Dashboard/AllAppointments.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import BuyingPage from './pages/BuyingPage.jsx';
import Login from './components/Login/Login.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx'
import ContactUs from './components/ContactUs/ContactUs.jsx';
import VideoCall from './components/VideoCall/VideoCall.jsx';

const App = () => {
  const location = useLocation();

  return (
    <>
      <ToastContainer />

      <div className='flex items-start h-[100vh] '>
      {/* {location.pathname !== '/' && <Sidebar />} */}

        <div className='w-full'>
          <Routes>
            <Route index path='/' element={<LandingPage />} />
            <Route path='/predict' element={<PredictPage />} />
            <Route path='/buy' element={<BuyingPage />} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/all-doctors' element={<AllDoctors/>} />
            <Route path="/all-doctors/:speciality" element={<AllDoctors/>}/>
            <Route path="/appointment/:docId" element={<Appointment/>}/>
            <Route path='/my-appointments' element={<AllAppointments/>} />
            <Route path='/video-call' element={<VideoCall/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/about-us' element={<AboutUs/>} />
            <Route path='/contact-us' element={<ContactUs/>} />
            {/* <Route path='/contract' element={<ton/>} /> */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App