import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaGoogle, FaRegEnvelope, FaRegUser } from 'react-icons/fa';
import { MdLockOutline, MdOutlineSmartphone } from 'react-icons/md';
import { postRegistrtion } from '@/rest/api'; // Assuming postRegistration is the correct function name

const signInBackgroundImageUrl = 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8fDA%3D';
const backgroundImageUrl = 'https://images.unsplash.com/photo-1622090860720-c4a77e146284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80';

export default function Signup({ onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFull_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageUploadUrl, setImageUploadUrl] = useState(null);
  
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/api/upload/profile`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      // Assuming the API returns the URL of the uploaded image
      if (result.imageUrl) {
        setImageUploadUrl(result.imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     handleImageUpload(file);
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const notAMemberSectionStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const signInSectionStyle = {
    backgroundImage: `url(${signInBackgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };




  const serviceRegistrtion = async (e) => {
      e.preventDefault();
  
      // First, upload the image
      if (profileImage) {
        await handleImageUpload(profileImage);
    }
  
      // Then, register the user with the image URL
      const registrationData = {
        full_name,
        phone_number,
        email,
        password,
        imageUrl: imageUploadUrl // Make sure this matches the backend's expected field name
    };

    const isSuccess = await postRegistrtion(registrationData);
  
      if (isSuccess && isSuccess.status === 'success') {
          alert(isSuccess.message);
          onToggleForm();
      }
  };
  
  // Update this function to set the image URL
 
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-10 lg:px-20 text-center">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full max-w-4xl">
        <div className="w-full lg:w-3/5 p-4 lg:p-10" style={signInSectionStyle}>
          <div className="text-left font-semibold">
            DevviCake
          </div>
          <div className="py-8 lg:py-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-purple-500 mb-2">Sign Up Your Account</h2>
            <div className="border-2 w-8 lg:w-10 border-purple-500 inline-block mb-2"></div>
            <div className="flex justify-center my-4 lg:my-6">
              <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                <FaFacebookF className="text-lg lg:text-xl" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                <FaGoogle className="text-lg lg:text-xl" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                <FaInstagram className="text-lg lg:text-xl" />
              </a>
            </div>
            <p className="text-black my-2 lg:my-3 text-black">Or use your email accounts</p>
            <form onSubmit={serviceRegistrtion} className="text-black my-2 lg:my-3">
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3">
                <FaRegUser className="text-gray-400 m-2" />
                <input
                  required
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={full_name}
              onChange={(e) => {
                setFull_name(e.target.value);
              }}
                />
              </div>

              <div className="bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3">
                <MdOutlineSmartphone className="text-gray-400 m-2" />
                <input
                  required
                  type="text"
                  name="phonenumber"
                  placeholder="Phone Number"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={phone_number}
              onChange={(e) => {
                setPhone_number(e.target.value);
              }}
                />
              </div>

              <div className="bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3">
                <FaRegEnvelope className="text-gray-400 m-2" />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
                />
              </div>

              <div className="bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
                />
              </div>

       

              <div className="bg-gray-100 w-full lg:w-64 p-2 flex items-center mb-3">
        <input
          type="file"
          name="profile_image"
          onChange={handleImageChange}
          className="bg-gray-100 outline-none text-sm flex-1"
        />
      </div>

             {/* Image preview section */}
             {imagePreviewUrl && (
        <div className="mb-3">
          <img src={imagePreviewUrl} alt="Profile Preview" className="w-20 h-20 object-cover rounded-full" />
        </div>
      )}
      
              <div className="flex justify-between w-full lg:w-64 mb-5">
                <label className="flex items-center text-xs">
                  <input type="checkbox" name="remember" className="mr-1" />Remember Me
                </label>
                <a href="#" className="text-xs">Forgot Password?</a>
              </div>
              <button
                href="#"
                className="border-2 border-green text-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-purple-600 hover:text-white"
                type="submit"
              >
                Sign up
              </button>
            </div>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-2/5 bg-green-500 text-white rounded-br-2xl lg:rounded-tr-2xl py-12 lg:py-36 px-6 lg:px-12" style={notAMemberSectionStyle}>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            A Member?<br className="lg:hidden" />
            <span className="text-yellow-400 lg:whitespace-nowrap lg:break-normal">Start The Journey!</span>
          </h2>

          <div className="border-2 w-8 lg:w-10 border-white inline-block mb-2"></div>
          <p className="mb-4 lg:mb-6 font-semibold">Fill up personal information and start your journey with us.</p>
          <a
            href="#"
            className="border-2 border-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-purple-600 hover:text-white"
            onClick={onToggleForm} // Toggle to sign-in form
          >
            Sign in
          </a>
        </div>
      </div>
    </main>
  );
}
