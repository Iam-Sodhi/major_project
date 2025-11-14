import { useState, useContext, useEffect } from "react";
import { Menu, X } from 'lucide-react';
import { useNavigate,NavLink } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "../context/AppContext";
// import Login from "./Login/Login";
import {assets} from '../assets/assets_frontend/assets.js'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { token, setToken, backendUrl,userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     if (isAuthenticated && user) {
  //       try {
  //         const response = await axios.post(backendUrl + "/api/user/generate-token", { email: user.email });
  //         localStorage.setItem("customToken", response.data.authentication); // Save the token in local storage
  //       } catch (error) {
  //         console.error("Error generating token:", error);
  //       }
  //     }
  //   };
  //   fetchToken();
  // }, [isAuthenticated, user]);

  // const handleLogin = () => {
  //   isAuthenticated
  //     ? logout({ logoutParams: { returnTo: window.location.origin } })
  //     : loginWithRedirect();
  // };

  const logout = async() => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-charcoal">Aurea</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <span className="text-charcoal hover:text-peach transition-colors duration-100 cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</span>
            <span className="text-charcoal hover:text-peach transition-colors duration-100 cursor-pointer" onClick={() => navigate("/all-doctors")}>All doctors</span>
            <span className="text-charcoal hover:text-peach transition-colors duration-100 cursor-pointer" onClick={() => navigate("/buy")}>Marketplace</span>
            <span className="text-charcoal hover:text-peach transition-colors duration-100 cursor-pointer" onClick={() => navigate("/about-us")}>About Us</span>
            <span className="text-charcoal hover:text-peach transition-colors duration-100 cursor-pointer" onClick={() => navigate("/contact-us")}>Contact Us</span>
            {/* <button
                className="bg-peach text-black px-6 py-2 rounded-lg hover:bg-opacity-90 font-medium"
                onClick={() => handleLogin()}
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button> */}

            <div className='flex gap-6'>
              <div className='flex item-center gap-4'>
                {
                  token && userData
                    ? <div className='flex item-center gap-2 cursor-pointer group relative'>
                      <img src={userData.image} alt="" className='w-8 rounded-full' />
                      <img src={assets.dropdown_icon} alt="" className='w-2.5' />
                      <div className='absolute top-0 right-0 pt-14 font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                          <p onClick={() => navigate('/profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                          <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                          <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                      </div>
                    </div>
                    : <button
                      onClick={() => navigate('/login')}
                      className='bg-peach px-8 py-3 text-black rounded-full hover:opacity-90 font-light hidden md:block'
                    >
                      Login
                    </button>
                }
              </div>
              <img
                onClick={() => setShowMenu(true)}
                className='w-6 md:hidden cursor-pointer'
                src={assets.menu_icon}
              />

              <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                  <img className='w-36' src={assets.logo} />
                  <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                  <NavLink to='/' onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                  <NavLink to='/doctors' onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                  <NavLink to='/about' onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>About Us</p></NavLink>
                  <NavLink to='/contact' onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>Contact Us</p></NavLink>
                </ul>
              </div>
            </div>

          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6 text-charcoal" /> : <Menu className="h-6 w-6 text-charcoal" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 text-charcoal hover:text-melon">Features</a>
            <a href="#how-it-works" className="block px-3 py-2 text-charcoal hover:text-melon">How it Works</a>
            <a href="#benefits" className="block px-3 py-2 text-charcoal hover:text-melon">Benefits</a>
            <button className="w-full text-center bg-peach font-medium text-black px-6 py-2 rounded-lg hover:bg-opacity-90">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
