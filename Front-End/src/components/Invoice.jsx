import React from 'react';
import axios from 'axios';
import { useState, useEffect  } from 'react';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

const ClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;

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

  

  const Invoice = ({ order }) => {
    const [name, setName] = useState('');
    const [order_id, setOrder_id] = useState('');
    const [total, setTotal] = useState(0);

    const [token, setToken] = useState('');

    const saveTokenToDatabase = async (paymentId,token) => {
      try {
          const response = await api.post('/api/token', { paymentId, token });
          console.log('Token saved:', response.data);
      } catch (error) {
          console.error('Error saving token:', error);
      }
  };


  const getToken = async () => {
      
      try {
          const response = await api.get('/api/token/' + order.order_id );
          setToken(response.data.data.token); // Menyimpan token ke state
          
      } catch (error) {
          console.error('Error:', error);
          process();
      }
  };
    

    const process = async () => {
        //e.preventDefault(); // Mencegah reload halaman
        const data = {
            name: order.Address.recipient_name,
            order_id: order.Payments[0].invoice,
            total: order.total_price
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await api.post('/process-transaction', data, config);
            setToken(response.data.token)

            //save token
            saveTokenToDatabase(order.order_id,response.data.token)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if(token) {
          //lakukan save token ke database

            window.snap.pay(token, {
                onSuccess: (result) => {
                    setToken("")
                    window.location.href = "";
                },
                onPending: (result) => {
                    setToken("")
                    window.location.href = "";
                },
                onError: (error) => {
                    console.log(error);
                    setToken("")
                    window.location.href = "";
                },
                onClose: () => {
                    console.log("Anda belum menyelesaikan pembayaran");
                    setToken("")
                    
                },
            })

            setName("")
            setOrder_id("")
            setTotal("")
        }
    }, [token]);

  

    useEffect(() => {
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransUrl

        const midtransClientKey = ClientKey;
        scriptTag.setAttribute("data-client-key", midtransClientKey)

        document.body.appendChild(scriptTag)

        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])

    
    return (
      <div className="bg-white rounded-md w-full">
        <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-4 overflow-x-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg text-gray-700 font-semibold">
                Order 
              </h3>
              <span className="text-sm text-gray-500 font-semibold">
                {order.Payments[0]?.invoice || 'No Invoice'}
              </span>
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
              <span className="text-sm text-gray-500">
                {addHoursToDate(order.order_date, 0)}
              </span>
            </div>
  
            <div className="mb-6">
              <h4 className="text-lg text-gray-700 font-semibold mb-2">Alamat Pengiriman</h4>
              <div className="text-sm text-gray-600">
                  <p>{order.Address.recipient_name} ({order.Address.phone_number})</p>
                  <p>{order.Address.address}</p>
              </div>
            </div>
  
            <div className="mb-4">
              <h4 className="text-lg text-gray-700 font-semibold mb-2">Detail Kue</h4>
              {order.OrderDetails.map((detail) => (
                <div key={detail.order_detail_id} className="flex items-center mb-4">
                  {
                            detail.Cake 
                              ? <>
                                  <img 
                                      src={detail.Cake.image} 
                                      alt={detail.Cake.name} 
                                      className="w-20 h-20 object-cover mr-4 rounded"
                                    />
                                    <div className="text-gray-900 text-lg">
                                      <p>{detail.Cake.name} (Qty: {detail.quantity})</p>
                                      <p>Harga: {formatRupiah(detail.Cake.price)}</p>
                                      <p>Subtotal: {formatRupiah(detail.quantity * detail.Cake.price)}</p>
                                    </div>
                                </>
                              : null 
                    }
                  
                </div>
              ))}
            </div>
  
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-black">
                Total Price: {formatRupiah(order.total_price)}
              </span>
            </div>
  
            <div className="mb-4">
              <p className="text-gray-900 text-lg">
                Kue Untuk Tanggal: {addHoursToDate(order.order_date, 0)}
              </p>
              <p className="text-gray-900 text-lg">
                Metode Pembayaran: {order.Payments[0]?.payment_method || 'Tidak Tersedia'}
              </p>
            </div>
          </div>
  
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
            <button 
              onClick={getToken}
              className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded"
            >
              Lakukan Pembayaran
            </button>
          </div>
        </div>
        
      </div>
    );
  };
  
export default Invoice;
