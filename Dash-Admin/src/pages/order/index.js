import React, { useState, useEffect } from 'react';
import Navbar2 from '@/components/Navbar';
import Order from '@/components/Order';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';
const OrderPages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this line
  const router = useRouter();
  useEffect(() => {
    const userData = getCookie("adminData");
    if (userData) {
      setIsAuthenticated(true); // Set to true if user data exists
    } else {
      router.push("/"); // Redirect if not authenticated
    }
  }, [router]);
  return (
    <>
      <Navbar2/>
      <Order />
    </>
  );
};

export default OrderPages;