// pages/home/index.js

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HeadlineCards from '@/components/HeadlineCards';
import Food from '@/components/Food';
import ShoppingCart from '@/components/ShoppingCart';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this line


  const router = useRouter();
  useEffect(() => {
    const userData = getCookie("userData");
    if (userData) {
      setIsAuthenticated(true); // Set to true if user data exists
    } else {
      router.push("/"); // Redirect if not authenticated
    }
  }, [router]);
  

  const addToCart = (product) => {

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {

      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItemCount = (count) => {

  };

  return (
    <div>
      <ToastContainer />
      {isAuthenticated && ( <Navbar toggleCart={() => setIsCartOpen(!isCartOpen)} /> )}
      {isAuthenticated && ( <Hero />)}
      {isAuthenticated && ( <HeadlineCards />)}
      {isAuthenticated && ( <Food addToCart={addToCart} /> )}

      {isCartOpen && isAuthenticated && (
        <ShoppingCart
          updateCartItemCount={updateCartItemCount}
          data={cart}
        />
      )}
    </div>
  );
}
