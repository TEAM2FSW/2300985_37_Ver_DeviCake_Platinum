import Navbar2 from '@/components/Navbar';
import Product from '@/components/Product';
import { ToastContainer } from 'react-toastify';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const Products = () => {
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
    <ToastContainer />
    <Navbar2/>
    {/* Container untuk mengatur konten di tengah */}
    <div className="container mx-auto px-4 md:px-6 py-8">
      <Product />
    </div>
  </>
  );
};

export default Products;
