import React, { useState, useEffect } from 'react';
import History from '@/components/History';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

const HistoryPage = () => {
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
  return (
    <div>
      <Navbar/>
      <History/>
    </div>
  );
};

export default HistoryPage;
