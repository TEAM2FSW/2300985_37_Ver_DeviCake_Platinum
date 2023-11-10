import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import Form from '@/components/Form';
import Signup from '@/components/Signup';

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleToggleForm = () => {
    setShowSignIn((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      <Header />
      {showSignIn ? (
        <Form onToggleForm={handleToggleForm} />
      ) : (
        <Signup onToggleForm={handleToggleForm} />
      )}
    </div>
  );
}
