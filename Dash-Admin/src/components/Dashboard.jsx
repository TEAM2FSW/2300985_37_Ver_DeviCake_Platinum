import { useEffect, useState } from 'react';
import { FaBox, FaRegUser } from 'react-icons/fa';
import { MdLocalShipping, MdDashboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import Link from 'next/link';
import { getCountOrders, getCountUsers } from '@/rest/api';

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getCountUsers();
        console.log('Fetched Users:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching Users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getCountOrders();
        console.log('Fetched Orders:', data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching Orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const button = document.getElementById('sidebarButton');
    const sidebar = document.getElementById('sidebar');

    if (button && sidebar) {
      button.addEventListener('click', () => {
        document.documentElement.setAttribute('data-sidenav', 'true');
      });
    }
  }, []);

  return (
    <div>
      <div id="view" className="h-full w-screen flex flex-row" data-sidenav="true">
        <button
          id="sidebarButton"
          className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
        >
          <svg className="w-5 h-5 fill-current" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>
        <div id="sidebar" className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden">
          <div className="space-y-6 md:space-y-10 mt-10">
            <h1 className="font-bold text-4xl text-center md:hidden">D<span className="text-teal-600">.</span></h1>
            <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">DevviDash<span className="text-teal-600">.</span></h1>
            <div id="profile" className="space-y-3">
              <img
                src=""
                alt="Avatar user"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                  Devvi
                </h2>
                <p className="text-xs text-gray-500 text-center">Administrator</p>
              </div>
            </div>
            <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
              <input
                type="text"
                className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
                placeholder="Search"
              />
              <button
                className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div id="menu" className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-600 hover:text-teal-500">
                <MdDashboard className="inline-block mr-2" />
                Dashboard
              </Link>
              <Link href="/products" className="text-gray-600 hover:text-teal-500">
                <FaBox className="inline-block mr-2" /> Product
              </Link>

              <Link href="/order" className="text-gray-600 hover:text-teal-500">
                <MdLocalShipping className="inline-block mr-2" /> Order
              </Link>
              <Link href="/report" className="text-gray-600 hover:text-teal-500">
                <TbReportSearch className="inline-block mr-2" />
                Reports
              </Link>

              <Link href="/user" className="text-gray-600 hover:text-teal-500">
                <FaRegUser className="inline-block mr-2" />
                User
              </Link>

            </div>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container px-6 py-8 mx-auto">
            <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                {/* First Card */}
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* ... (SVG path data for the first card) ... */}
                      </svg>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">{users.user}</h4>
                      <div className="text-gray-500">Pengguna</div>
                    </div>
                  </div>
                </div>

                {/* Second Card */}
                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                  <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* ... (SVG path data for the second card) ... */}
                      </svg>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">{orders.order}</h4>
                      <div className="text-gray-500">Total Orders</div>
                    </div>
                  </div>
                </div>

                {/* Third Card */}
                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                  <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                    <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* ... (SVG path data for the third card) ... */}
                      </svg>
                    </div>

                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700">11111111</h4>
                      <div className="text-gray-500">Total Income</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {/* ... Content Tambahan ... */}
            </div>

            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Product
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Product
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Product
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Product
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Product
                        </th>
                        {/* ... (additional table headers) ... */}
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {/* Table content removed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
