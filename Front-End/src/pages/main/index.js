import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeadlineCards from "@/components/HeadlineCards";
import Food from "@/components/Food";


export default function Main() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <Hero />
      <HeadlineCards />
      <Food />
      
    </div>
  );
}
