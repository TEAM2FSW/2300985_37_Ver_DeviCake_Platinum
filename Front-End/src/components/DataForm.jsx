import Head from 'next/head';
import { getCart, postCheckout, getAddress, updateAlamat, deleteAlamat } from '@/rest/api';
import { useState, useEffect, useRef  } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';


const ConfirmationModal = ({ isOpen, onClose, onConfirm, addressId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <p>Are you sure you want to delete this address?</p>
        <div className="flex justify-end mt-4">
          <button className="mr-2" onClick={onClose}>
            Cancel
          </button>
          <button onClick={() => onConfirm(addressId)}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};




const Checkout = () => {
  
  
  
  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [addressToRemove, setAddressToRemove] = useState(null);
  const [cartProducts, setCartProducts] = useState("");
  const [address, setAddress] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const formRef = useRef(null);
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);
  

  {/* Collapse dan Remove */}
  const toggleCollapse = (address) => {
    if (isCollapsed === address) {
        setIsCollapsed(null); // Close the form if it's already open
    } else {
        setIsCollapsed(address); // Open the form for the clicked address
    }
};

  const handleRemoveAddress = (addressId) => {
    setAddressToRemove(addressId);
    setShowConfirmationModal(true, addressId);
  };

  const handleConfirmationCancel = () => {
    setShowConfirmationModal(false);
    setAddressToRemove(null);
  };

  const handleConfirmationConfirm = async (addressId) => {
    setShowConfirmationModal(false);
  
    if (addressId) {
      try {
        // Call the function to delete the address from the database
        await deleteAlamat(addressId);
  
        // Update local state to reflect the deletion
        setAddress(previousAddresses => 
          previousAddresses.filter(addr => addr.address_id !== addressId)
        );
      } catch (error) {
        console.error('Error deleting address:', error);
        // Handle any errors here, such as displaying a notification to the user
      }
    }
  };
{/* Batas Akhir*/}



  useEffect(() => {
    const fetchData = async () => {
      try {
        const cakesData = await getCart();
        if (Array.isArray(cakesData)) {
          setCartProducts(cakesData);
        } else {
          console.error('Cart data is not an array:', cakesData);
          setCartProducts([]); 
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setCartProducts([]); 
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressData = await getAddress();
        if (Array.isArray(addressData)) {
          setAddress(addressData);
        } else {
          console.error('Address data is not an array:', addressData);
          setAddress([addressData]); // Mengubah data menjadi array
        }
      } catch (error) {
        console.error('Failed to fetch address:', error);
        setAddress([]); 
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (Array.isArray(cartProducts)) {
      const newSubtotal = cartProducts.reduce((total, item) => {
        return total + item.sub_total;
      }, 0);
      setSubtotal(newSubtotal);
    }
  }, [cartProducts]);

  const formatRupiah = (number) => {
    const parts = number.toFixed(0).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${parts.join('.')}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formRef.current) {

      const isValid = [...formRef.current.elements].every(input => {
        return input.required ? !!input.value : true;
      });
  
      if (!isValid) {
        //alert('Silahkan isikan semua data.');
        toast.error("Silahkan isikan semua data.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        });
        return;
      } else {
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        
        if (!data.address_id && !data.recipient_name) {
          //alert('Silahkan isikan semua data.');
          toast.error("Silahkan isikan semua data.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000
          });
          //console.log("Baik address_id dan recipient_name kosong.");
        } else if (!data.address_id && data.recipient_name) {
          try {
            // Call your API or handle the form data
            await postCheckout(data);
            toast.success("Pesanan berhasil dibuat.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000
            });
            router.push("/history");
          } catch (error) {
            console.error('Error in form submission:', error);
          }
            // Jika address_id kosong tapi recipient_name ADA
            //console.log("address_id kosong tetapi recipient_name ada.");
        } else if (data.address_id && !data.recipient_name) {
          try {
            // Call your API or handle the form data
            await postCheckout(data);
            toast.success("Pesanan berhasil dibuat.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000
            });
            router.push("/history");
          } catch (error) {
            console.error('Error in form submission:', error);
          }
            // Jika address_id ADA tapi recipient_name kosong
            //console.log("address_id ada tetapi recipient_name kosong.");
        } else {
            // Jika KEDUANYA ADA
            //console.log("address_id dan recipient_name keduanya ada.");
        }
        
        
      }

    }
  };


  const handleUpdateClick = async (addressItem) => {
    const payload = {
      recipient_name: addressItem.recipient_name,
      phone_number: addressItem.phone_number,
      address: addressItem.address
    };
  
    const update = await updateAlamat(payload, addressItem.address_id);
    if (update) {
      
      setIsCollapsed(null)
    }
  };

const handleInputChange = (event, addressId) => {
  const { name, value } = event.target;
  setAddress(prevAddresses =>
    prevAddresses.map(addr =>
      addr.address_id === addressId ? { ...addr, [name]: value } : addr
    )
  );
};

  function AlamatSection({ dataAlamat }) {
    if (!address || address.length === 0) {
      return (
        <div>
          <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  PENGIRIMAN DAN PEMBAYARAN
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                

                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="w-1/4 text-left px-2">Name</span>
                  <input
                    name="recipient_name"
                    className="focus:outline-none px-3 w-3/4"
                    placeholder="Asep"
                    required="yes"
                  />
                </label>
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="w-1/4 text-left px-2">No Whatsapp</span>
                  <input
                    name="phone_number"
                    className="focus:outline-none px-3 w-3/4"
                    placeholder="6286837847"
                    required="yes"
                  />
                </label>
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="w-1/4 text-left px-2">Alamat</span>
                  <input
                    name="address"
                    type="text"
                    className="focus:outline-none px-3 w-3/4"
                    placeholder="Jalan Jakarta Barat no.Papua Timur"
                    required="yes"
                  />
                </label>
                
                {/* ... Rest of the form fields ... */}
              </fieldset>
        </div>
       ); // Tidak merender apa-apa jika tidak ada data
    }

    const postOrder = async (payload) => {
      try {
        // Call the deleteCartItem function and pass the cart_item_id
        await postCheckout({ payload });
    
   
      } catch (error) {
        // Handle any errors here
        console.error("Error order", error);
      }
    };

   
  
    return (
      <div>
        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
          Pilih Alamat
        </h2>
        <div className="bg-white shadow-lg rounded text-gray-600 border-collapse">
        <>
            {address.map((alamat, index) => (
                <React.Fragment key={index}>
                    <label className="flex items-center border-b border-gray-200 py-2 cursor-pointer px-2">
                        <input
                          type="radio"
                          name="address_id"
                          value={`${alamat.address_id}`}
                          className="mr-4"
                      />
                      <div className="flex items-center justify-between w-full">
                          <div>
                              <span className="font-semibold">{alamat.recipient_name} ({alamat.phone_number})</span>
                              <p className="text-gray-500">{alamat.address}</p>
                          </div>
                          <div className="flex items-center">
                              {/* Edit icon */}
                              <span
                                  className="cursor-pointer text-gray-500 hover:text-blue-500 mr-2"
                                  onClick={() => toggleCollapse(alamat.address_id)}
                              >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      className="h-5 w-5"
                                  >
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M15.232 2.232a1.5 1.5 0 012.121 0l4.646 4.646a1.5 1.5 0 010 2.121L10.343 20.557a2 2 0 01-.878.47l-4.495 1.125a1 1 0 01-1.212-1.213l1.125-4.495a2 2 0 01.47-.878L15.232 2.232z"
                                      />
                                  </svg>
                              </span>
                              {/* Remove icon */}
                              <span
                                  className="cursor-pointer text-gray-500 hover:text-red-500"
                                  onClick={() => handleRemoveAddress(alamat.address_id)}
                              >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      className="h-5 w-5"
                                  >
                                      <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"
                                      />
                                  </svg>
                              </span>
                          </div>
                      </div>
                    </label>
                    
                </React.Fragment>
            ))}
        </>
        
      </div>

      
              
      
      {showConfirmationModal && (
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
        addressId={addressToRemove}
      />
    )}
       
      </div>
    );
    
  };


  return (
    <div>
      <Head>
        <title>Checkout - Your Cakes</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="h-screen grid grid-cols-3">
      
        <div className="lg:px-12 px-4 lg:col-span-2 col-span-3 bg-indigo-50 space-y-8">
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
              Complete your orders and payment details below.
            </div>
          </div>
          <form id="checkoutForm" onSubmit={handleSubmit} ref={formRef}>
          <div className="rounded-md">
          
          <section>
            <AlamatSection dataAlamat={address} />
          </section>

          <section>
            {Array.isArray(address) && address.map((addressItem, index) => (
              <div key={index}>
                
                {isCollapsed === addressItem.address_id && (
                  <div className="transition-all duration-300" id={`collapse-${addressItem.address_id}`} data-te-collapse-item>
                      
                    
                      {/* ...form fields... */}
                      <div>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                                EDIT ALAMAT
                              </h2>
                              <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                              

                              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="w-1/4 text-left px-2">Name</span>
                                <input
                                  className="focus:outline-none px-3 w-3/4"
                                  name="recipient_name"
                                  value={addressItem.recipient_name}
                                  onChange={(e) => handleInputChange(e, addressItem.address_id)}
                                />
                              </label>
                              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="w-1/4 text-left px-2">No Whatsapp</span>
                                <input
                                  name="phone_number"
                                  className="focus:outline-none px-3 w-3/4"
                                  value={addressItem.phone_number}
                                  onChange={(e) => handleInputChange(e, addressItem.address_id)}
                                />
                              </label>
                              <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="w-1/4 text-left px-2">Alamat</span>
                                <input
                                  name="address"
                                  type="text"
                                  className="focus:outline-none px-3 w-3/4"
                                  value={addressItem.address}
                                  onChange={(e) => handleInputChange(e, addressItem.address_id)}
                                />
                              </label>
                              
                              {/* ... Rest of the form fields ... */}
                            </fieldset>
                            <div 
                              type="submit" onClick={() => handleUpdateClick(addressItem)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Update Alamat
                            </div>
                      </div>
                      {/* ... */}
                  </div>
                )}
                {/* ...other code... */}
              </div>
            ))} 
          </section>

              <section>
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  PENGIRIMAN DAN PEMBAYARAN
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="w-1/4 text-left px-2">Tanggal</span>
                  <input
                    type="date"
                    name="tanggal"
                    className="focus:outline-none px-3 w-3/4"
                    required="yes"
                  />
                </label>

                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="w-1/4 text-left px-2">Waktu</span>
                  <input
                    type="time"
                    name="waktu"
                    className="focus:outline-none px-3 w-3/4"
                    required="yes"
                  />
                </label>
                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span className="w-1/4 text-left px-2">Metode Pembayaran</span>
                  <select
                    name="paymentMethod"
                    className="focus:outline-none px-3 w-3/4 border border-gray-300 rounded"
                    required="yes"
                  >
                    <option value="">Pilih Metode Pembayaran</option>
                    <option value="COD">COD (Cash on Delivery)</option>
                    <option value="BankTransfer">Bank Transfer</option>
                    <option value="EWallet">E-Wallet</option>
                  </select>
                </label>
                
                {/* ... Rest of the form fields ... */}
              </fieldset>

              </section>
              
          </div>
          <div className="rounded-md">
      
          </div>
          <button type="submit" className="hidden md:inline-flex justify-center submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
          >
            Pay {formatRupiah(subtotal)} 
          </button>
          
          </form>
        </div>
        <div className="col-span-3 sm:col-span-1 bg-white">
          <h1 className="py-4 md:py-6 border-b-2 text-lg md:text-xl text-gray-600 px-4 md:px-8">Order Summary</h1>
          <ul className="py-4 md:py-6 border-b space-y-4 md:space-y-6 px-4 md:px-8">
            {Array.isArray(cartProducts) && cartProducts.length > 0 && (
              cartProducts.map((item, index) => (
                <li className="flex py-4 md:py-6">
                  <div className="h-20 w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.Cake.image}
                      alt="Product"
                      className="h-full w-full object-cover object-center rounded"
                    />
                  </div>

                  <div className="ml-3 md:ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-sm md:text-base font-medium text-gray-900">
                        <h3>{item.Cake.name}</h3>
                        <p className="ml-3 md:ml-4">{formatRupiah(item.Cake.price)}</p>
                      </div>
                      <p className="mt-1 text-xs md:text-sm text-gray-500">{item.Cake.description}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-xs md:text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                      <p className="text-pink-400 font-semibold inline-block">{formatRupiah(item.sub_total)}</p>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        
          <div className="px-4 md:px-8 border-b">
            {/* Total */}
          </div>
          <div className="font-semibold text-lg md:text-xl px-4 md:px-8 flex justify-between py-6 md:py-8 text-gray-600">
            <span>Total</span>
            <span> Pay {formatRupiah(subtotal)} </span>
          </div>
          <button
          className="block md:hidden submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}>
          Pay {formatRupiah(subtotal)} 
        </button>

        </div>
      </div>
      
    </div>
  );
};

export default Checkout;