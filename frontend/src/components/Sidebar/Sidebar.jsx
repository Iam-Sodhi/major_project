import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar,
  UserRound,
  Brain,
  User,
  ShoppingBag,
  LogOut
} from 'lucide-react';

import Data from './Data.jsx';
import { AppContext } from '../../context/AppContext.jsx';

function Sidebar() {
  const {token,setToken} = useContext(AppContext)

  const sidebarLinks = [
    {
      path: '/my-appointments',
      icon: <Calendar className="h-5 w-5" />,
      label: 'Appointments'
    },
    {
      path: '/all-doctors',
      icon: <UserRound className="h-5 w-5" />,
      label: 'Doctor List'
    },
    {
      path: '/predict',
      icon: <Brain className="h-5 w-5" />,
      label: 'Dr. Derma'
    },
    {
      path: '/profile',
      icon: <User className="h-5 w-5" />,
      label: 'Profile'
    },
    {
      path: '/buy',
      icon: <ShoppingBag className="h-5 w-5" />,
      label: 'Marketplace'
    }
  ];

  const handleLogout = () => {
    setToken(false)
    localStorage.removeItem('token')
  };

  return (
    <div className="col-span-2 row-span-12 h-screen overflow-hidden border-r">
      <Data />
      <div className="flex flex-col justify-between bg-white pb-6">
        <ul className="mt-5 flex flex-col items-center justify-center text-gray-600">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 md:px-9 md:min-w-60 cursor-pointer transition-colors
                ${
                  isActive
                    ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary'
                    : 'hover:bg-gray-50'
                }`
              }
              to={link.path}
            >
              {link.icon}
              <span className="hidden md:block">{link.label}</span>
            </NavLink>
          ))}
        </ul>

        <div className="px-4 mt-20">
          {
            token && <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-3 rounded-lg py-3 text-gray-600 transition-colors border-2 border-purple-300 hover:bg-gray-50 md:px-5"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden md:block">Logout</span>
                      </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Sidebar;