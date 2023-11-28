// components/ShoppingCart.jsx

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getCart, deleteCartItem, updateCartQuantity } from '@/rest/api';
import Link from 'next/link';


const ShoppingCart = ({ updateCartItemCount, data }) => {
  const [open, setOpen] = useState(true);
  const [cartProducts, setCartProducts] = useState(data);
  const [subtotal, setSubtotal] = useState(0);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cakesData = await getCart();
        setCartProducts(cakesData);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newSubtotal = calculateTotalPrice();
    setSubtotal(newSubtotal);
  }, [cartProducts]);

  // const handleRemoveProduct = (productId) => {
  //   setCartProducts((prevProducts) => {
  //     const updatedProducts = prevProducts.filter((data) => data.id !== productId);
  //     updateCartItemCount(updatedProducts.length); // Update cart item count
  //     return updatedProducts;
  //   });
  // };

  const handleRemoveProduct = async (cart_item_id) => {
    try {
      // Call the deleteCartItem function and pass the cart_item_id
      await deleteCartItem({ cart_item_id: cart_item_id });
  
      // Filter out the removed item from the cartProducts state
      setCartProducts((prevProducts) => prevProducts.filter(item => item.cart_item_id !== cart_item_id));
  
      // Optionally, update cart item count if you have such a function/state
      // updateCartItemCount(cartProducts.length - 1);
    } catch (error) {
      // Handle any errors here
      console.error("Error removing cart item:", error);
    }
  };

  const handleAdjustQuantity = async (productId, newQuantity) => {
    try {
      // Call the updateCartQuantity API function
      await updateCartQuantity({ cart_item_id: productId, quantity: newQuantity });
  
      // Update the local cartProducts state
      setCartProducts(prevProducts => prevProducts.map(item => {
        if (item.cart_item_id === productId) {
          // Calculate new sub_total
          const newSubTotal = item.Cake.price * newQuantity;
  
          return { ...item, quantity: newQuantity, sub_total: newSubTotal };
        }
        return item;
      }));
    } catch (error) {
      console.error("Error adjusting cart quantity:", error);
    }
  };
  

  const calculateTotalPrice = () => {
    if (cartProducts && Array.isArray(cartProducts)) {
      return cartProducts.reduce((total, item) => {
        return total + item.sub_total;
      }, 0); // Formats the total as a string with two decimal places
    }
    return "0";
  };

 

  const formatRupiah = (number) => {
    const parts = number.toFixed(0).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${parts.join('.')}`;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          // ... (existing code)
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartProducts.map((item, index) => (
                          
                          <li key={item.cart_item_id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.Cake.image}
                              alt={item.Cake.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">{item.Cake.name}</a>
                                </h3>
                                <p className="ml-4">{formatRupiah(item.Cake.price)}</p>        
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{item.Cake.description}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center">
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => handleAdjustQuantity(item.cart_item_id, Math.max(1, item.quantity - 1))}
                              >
                                -
                              </button>
                              <input 
                                type="number"
                                className="mx-2 border text-center w-12"
                                value={item.quantity}
                                min={1}
                                onChange={(e) => handleAdjustQuantity(item.cart_item_id, Math.max(1, parseInt(e.target.value)))}
                              />
                              <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => handleAdjustQuantity(item.cart_item_id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() => handleRemoveProduct(item.cart_item_id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>

                          ))}
                          
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{formatRupiah(subtotal)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                      <Link href="/checkout">
              
                       <div
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </div>
                        
                      </Link>
                        
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p className="mr-2">
                          or
                        </p>
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ShoppingCart;
