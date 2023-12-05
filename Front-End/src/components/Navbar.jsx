import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaWallet } from 'react-icons/fa';
import { MdFavorite, MdHistory, MdHome } from 'react-icons/md';
import Cart from '@/components/ShoppingCart';
import { removeCookie } from "@/utils/cookies";
import { useRouter } from "next/router";

const Navbar = ({ toggleCart }) => {
  const [nav, setNav] = useState(false);
  const router = useRouter();
  const logout = () => {
    removeCookie("userData");
    router.reload("/");
  };

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
      {/* Left side */}
      <div className='flex items-center'>
        <div onClick={() => setNav(!nav)} className='cursor-pointer'>
          <AiOutlineMenu size={30} />
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2 hidden md:block'>
          Devvi <span className='font-bold'>Cakes</span>
        </h1>
        <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
          <p className='bg-black text-white rounded-full p-2'>Delivery</p>
          <p className='p-2'>Pickup</p>
        </div>
      </div>

      {/* Search Input for Desktop View */}
      <div className='hidden lg:flex bg-gray-200 rounded-full flex items-center px-2 w-[500px] lg:w-[500px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search foods'
        />
      </div>

      {/* Search Input for Mobile View */}
      <div className='lg:hidden bg-gray-200 rounded-full flex items-center px-2 w-[200px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search foods'
        />
      </div>

      {/* Cart button for both desktop and mobile views */}
      <button
        onClick={() => {
          toggleCart();
        }}
        className='bg-black text-white md:hidden flex items-center py-2 px-4 rounded-full'
      >
        <BsFillCartFill size={20} className='mr-2' /> Cart
      </button>
      <button
        onClick={() => {
          toggleCart();
        }}
        className='bg-black text-white hidden md:flex items-center py-2 px-4 rounded-full'
      >
        <BsFillCartFill size={20} className='mr-2' /> Cart
      </button>

      {/* Mobile Menu Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300'
            : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4'>
          Devvi <span className='font-bold'>Cakes</span>
        </h2>
        <nav>
          <ul className='flex flex-col p-4 text-gray-800'>
            <li className='text-xl py-4 flex'>
              <Link href="/home">
              
                  <MdHome size={25} className='mr-4' /> Home
                
              </Link>
            </li>
            <li className='text-xl py-4 flex'>
              <Link href="/orders">
              
                  <TbTruckDelivery size={25} className='mr-4' /> Orders
                
              </Link>
            </li>
            <li className='text-xl py-4 flex'>
              <Link href="/favorites">
              
                  <MdFavorite size={25} className='mr-4' /> Favorites
                
              </Link>
            </li>
            <li className='text-xl py-4 flex'>
              <Link href="/wallet">
              
                  <FaWallet size={25} className='mr-4' /> Wallet
                
              </Link>
            </li>
            <li className='text-xl py-4 flex'>
              <Link href="/history">
              
                  <MdHistory size={25} className='mr-4' /> History
                
              </Link>
            </li>
          </ul>

          <button  onClick={logout} >Log Out</button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
