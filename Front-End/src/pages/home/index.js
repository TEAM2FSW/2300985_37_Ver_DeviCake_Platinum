// pages/home/index.js

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HeadlineCards from '@/components/HeadlineCards';
import Food from '@/components/Food';
import ShoppingCart from '@/components/ShoppingCart';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

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
      <Navbar toggleCart={() => setIsCartOpen(!isCartOpen)} />
      <Hero />
      <HeadlineCards />
      <Food addToCart={addToCart} />

      {isCartOpen && (
        <ShoppingCart
          updateCartItemCount={updateCartItemCount}
          data={cart}
        />
      )}
    </div>
  );
}
