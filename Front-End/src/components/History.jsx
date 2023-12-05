import { useState, useEffect  } from 'react';
import { getOrderByIdUser } from '@/rest/api';
import Link from 'next/link';

const History = () => {
  const [orderLists, setOrderlists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await getOrderByIdUser();
        if (Array.isArray(orderData)) {
          setOrderlists(orderData);
        } else {
          console.error('Cart data is not an array:', orderData);
          setOrderlists([]); 
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setOrderlists([]); 
      }
    };
    fetchData();
  }, []);

  function addHoursToDate(isoDateString, hoursToAdd) {
    // Parse the ISO date string into a Date object
    const date = new Date(isoDateString);
  
    // Add the specified number of hours
    date.setHours(date.getHours() + hoursToAdd);
  
    // Manually construct the date string in the desired format
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  const formatRupiah = (number) => {
    const parts = number.toFixed(0).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${parts.join('.')}`;
  };
  
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 font-semibold">History Order</h2>
          <span className="text-xs">All products item</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block "
              type="text"
              name=""
              id=""
              placeholder="search..."
            />
          </div>
        </div>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order
                </th>
                
              </tr>
            </thead>
            <tbody>
            {orderLists
              .sort((a, b) => b.order_id - a.order_id) // Mengurutkan orderLists berdasarkan order_id secara descending
              .map((order, index) => (
                <div key={order.order_id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg text-gray-700 font-semibold">
                  Order #{index + 1}
                </h3>
                  <span className="text-sm text-gray-500 font-semibold"> {order.Payments[0]?.invoice || 'No Invoice'}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.Payments[0]?.status === 'Completed' ? 'text-green-900 bg-green-200' :
                  order.Payments[0]?.status === 'Failed' ? 'text-red-900 bg-red-200' :
                  'text-yellow-900 bg-yellow-200' // Default style for 'Pending' or other statuses
                  }`}>
                    {order.Payments[0]?.status === 'Pending' && 'Belum Bayar'}
                    {order.Payments[0]?.status === 'Completed' && 'Sudah Bayar'}
                    {order.Payments[0]?.status === 'Failed' && 'Gagal'}
                </span>
                  <span className="text-sm text-gray-500">{addHoursToDate(order.order_date, 0)}</span>
                </div>
                
                
                <div className="mb-2">
                  {order.OrderDetails.map((detail) => (
                    <div key={detail.order_detail_id} className="flex items-center mb-2">


                      {
                            detail.Cake 
                              ? <>
                                  <img 
                                    src={detail.Cake.image} 
                                    alt={detail.Cake.name} 
                                    className="w-10 h-10 object-cover mr-2 rounded" // Adjust size as needed
                                  />
                                  <p className="text-gray-900">
                                    {detail.Cake.name} (Qty: {detail.quantity})
                                  </p>
                                </>
                              : null 
                          }
                    
                  </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Price: {formatRupiah(order.total_price)}</span>
                  {/* Button to view order details, placed on the right */}
                  <Link href={`/invoice/${order.order_id}`} passHref>
                    <button className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>
              ))
            }
            </tbody>
          </table>
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 50 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                Prev
              </button>
              &nbsp; &nbsp;
              <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
