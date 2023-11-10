import React, { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`bg-gray-800 p-4 flex justify-between items-center lg:justify-center lg:w-full ${isMobileMenuOpen ? 'w-full border-t-2 border-gray-900' : ''}`}>

      <div className={`lg:flex items-center space-x-4 ${isMobileMenuOpen ? 'justify-center' : 'hidden lg:flex'}`}>
        <a href="#" className="text-white">Home</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white">Order</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white">Null</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
      </div>

      <button
        type="button"
        className="lg:hidden text-white focus:outline-none"
        onClick={toggleMobileMenu}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </nav>
  );
}
