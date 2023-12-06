import TransactionChart from '@/components/Chart';
import Navbar2 from '@/components/Navbar';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

const ReportPages = () => {
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
      <Navbar2 />
      <TransactionChart />
    </div>
  );
};

export default ReportPages;
