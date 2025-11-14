import React,{useContext} from 'react'
import { DoctorContext } from './Context/DoctorContext.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from 'react-router-dom';

import NavBar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import SideBar from './components/SideBar.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx'
import DoctorAppointments from './pages/doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/doctor/DoctorProfile.jsx';

function App() {
  const {dToken} = useContext(DoctorContext)

  return dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className='flex items-start'>
        <SideBar/>

        <Routes>
          {/* Doctor Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path="/doctor-appointments" element={<DoctorAppointments/>} />
          <Route path="/doctor-profile" element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App