import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaGoogle, FaRegEnvelope, FaRegUser } from 'react-icons/fa';
import { MdLockOutline, MdOutlineSmartphone } from 'react-icons/md';
import { postRegistrtion } from '@/rest/api'; // Assuming postRegistration is the correct function name
import { toast } from 'react-toastify';

const signInBackgroundImageUrl = 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8fDA%3D';
const backgroundImageUrl = 'https://images.unsplash.com/photo-1622090860720-c4a77e146284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80';

export default function Signup({ onToggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFull_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageUploadUrl, setImageUploadUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

    const handleImagesChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            handleImageUpload(file)
        }
    };
  
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/api/images/upload/profile`, {
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
      //console.log(profileImage);
      // First, upload the image
    //   if (profileImage) {
    //     await handleImageUpload(profileImage);
    // }
  
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
        toast.success("Registrasi Berhasil !!!", {
          position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });
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

              <div className="bg-gray-100 w-full lg:w-64  flex items-center mb-3">
                <div className="flex flex-col items-center bg-gray-100 w-full lg:w-64  flex items-center mb-3" >
                <label className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                    <div id="preview-container" className="flex flex-col justify-center items-center w-full h-full" style={{ maxWidth: '250px', maxHeight: '250px'}}>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '250px', maxHeight: '250px', width: 'auto', height: 'auto' }} />
                        ) : (
                            <>
                                <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h10m-7 4h7"></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x800px)</p>
                            </>
                        )}
                    </div>
                    <input type="file" name="profile_image" className="hidden" onChange={handleImagesChange} />
                </label>
            </div>
        </div>

       

      
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
