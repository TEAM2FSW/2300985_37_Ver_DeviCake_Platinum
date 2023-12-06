
import  React, { useEffect, useState } from "react";
import { postLogin } from '@/rest/api';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from "@/utils/cookies";
import Link from "next/link";
import { toast } from 'react-toastify';


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const serviceLgn = async (e) => {
    e.preventDefault();
    const isSuccess = await postLogin(
        {
            email,
            password
        }
    )

    if (isSuccess && isSuccess.status === 'success') {
        setCookie("adminData", JSON.stringify(isSuccess.data), {
            expires: 1
        })
        //alert("LOGIN BERHASIL !!!");
        toast.success("LOGIN BERHASIL !!!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });
        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    }

  }


  useEffect(() => {
    const userData = getCookie("adminData");
    //console.log(userData);
    // if (userData) {
    //   const parsedUserData = JSON.parse(userData);
    //   if (parsedUserData && parsedUserData.accessToken) {
    //     router.push("/home");
    //   }
    // }
  }, []);


  return (
    <div className="font-mono bg-gray-400">
      {/* Container */}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{ backgroundImage: "url('https://imgc.allpostersimages.com/img/print/posters/dlillc-baby-emperor-penguin_a-G-13448178-14258384.jpg')" }}
            ></div>
            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
              <form onSubmit={serviceLgn}  className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="Email"
                    type="text"
                    placeholder="Email"
                    value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
                  />
                  <p className="text-xs italic text-red-500">Please input a password.</p>
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
