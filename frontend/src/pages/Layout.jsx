import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout = ({children}) => {
  return (
    <div className='h-screen w-full grid grid-cols-12 grid-rows-12'>
        {/* <div className='col-span-12 row-span-1 bg-red-400'></div> */}
        <Sidebar className='col-span-2 row-span-12 bg-gray-200' /> {/* Adjust as needed */} 
        <div className='col-span-10 row-span-12 h-screen overflow-y-scroll'>
          {children}
        </div>
    </div>
  );
};

export default Layout;
