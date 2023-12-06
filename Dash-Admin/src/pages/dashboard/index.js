import Dashboard from "@/components/Dashboard";
import React, { useState, useEffect } from 'react';
import { getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from 'next/router';
const DashboardPage = () => {
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
      <Dashboard />
    </>
  );
};

export default DashboardPage;
