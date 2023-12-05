import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/Header';
import SignIn from '@/components/Form';
import Signup from '@/components/Signup';
import AdminLogin from '@/components/AdminLogin';

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleToggleForm = async () => {
    if (userIsLoggedIn && showSignIn) {
      router.push('main');
    } else {
      setShowSignIn((prev) => !prev);
      setShowAdminForm(false);
    }
  };

  const handleToggleAdminForm = () => {
    setShowAdminForm((prev) => !prev);
    setShowSignIn(false);
  };

  return (
    <div style={{ backgroundColor: '#ffd700' }}>
      <ToastContainer />
      <Header />
      {showSignIn && !showAdminForm && (
        <SignIn onToggleForm={handleToggleForm} setUserIsLoggedIn={setUserIsLoggedIn} />
      )}
      {!showSignIn && !showAdminForm && (
        <Signup onToggleForm={handleToggleForm} setUserIsLoggedIn={setUserIsLoggedIn} />
      )}
      {showAdminForm && (
        <AdminLogin />
      )}
      <a href="#" className=" px-8 py-2 inline-block font-semibold hover:bg-purple-600 hover:text-white" onClick={handleToggleAdminForm}>
        Admin?
      </a>
    </div>
  );
}
