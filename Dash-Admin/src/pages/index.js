import AdminLogin from "@/components/AdminLogin";
import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';

import { ToastContainer } from 'react-toastify';
const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this line
  const router = useRouter();
  useEffect(() => {
    const userData = getCookie("adminData");
    if (userData) {
      setIsAuthenticated(true); // Set to true if user data exists
      router.push("/dashboard")
    }
  }, [router]);
  return (
    <div>
      <ToastContainer />
      <AdminLogin/>
    </div>
  );
};

export default Home;
