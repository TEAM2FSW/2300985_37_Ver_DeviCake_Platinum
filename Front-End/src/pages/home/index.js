// pages/index.js

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HeadlineCards from '@/components/HeadlineCards';
import Food from '@/components/Food';
import ShoppingCart from '@/components/ShoppingCart';

const HomePage = () => {
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
    // If you need to do something when the cart item count updates, you can add it here.
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
};

export default HomePage;
