
import Navbar2 from "@/components/Navbar";
import User from "@/components/User";

import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';

const UserPages = () => {
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
    
    <div>
    <Navbar2/>
    <User/>
    </div>
  )
};

export default UserPages;