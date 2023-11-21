// components/ProductDetail.jsx
import React, { useState } from 'react';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';
import { postCartItem } from '@/rest/api'; 

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);

  const formatRupiah = (number) => {
    const parts = number.toFixed(0).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${parts.join('.')}`;
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const addToCart = async () => {
    try {
      // Asumsi Anda memiliki cara untuk mendapatkan cartId, misalnya dari user context
      const userId = 3; // Contoh sementara
      await postCartItem({ userId, cakeId: product.cake_id, quantity });
      alert('Produk ditambahkan ke keranjang');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Gagal menambahkan ke keranjang');
    }
  };
  
  return (
    <div>
      <div className="p-3 max-w-7xl m-auto">
        <div className="mt-6 sm:mt-10">
          <div>
            <div className="grid gird-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 h-max">
              {/* Product Image */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full"
                />
              </div>
              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Product Title */}
                  <h1 className="text-3xl text-red-500 font-semibold sm:text-4xl">
                    {product.name}
                  </h1>
                  {/* Product Description */}
                  <p className="mt-3 text-gray-600 text-md leading-6 text-justify sm:text-left sm:mt-4">
                    {product.description}
                  </p>
                  {/* Product Price */}
                  <span className="text-xl text-red-500 font-semibold sm:text-2xl">
                    {formatRupiah(product.price)}
                  </span>
                </div>
                {/* Quantity Input and Order Button */}
                <div className=" ">
                  <div className="text-left flex flex-col gap-2 w-full">
                    {/* Quantity Label */}
                    <label className="font-semibold">Quantity</label>
                    {/* Quantity Input */}
                    <input
                      className="border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500"
                      type="number"
                      defaultValue="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      required
                    />
                  </div>
                  {/* Order Button */}
                  <div className="w-full text-left my-4">
                    <button
                      className="flex justify-center items-center gap-2 w-full py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6"
                      title="Confirm Order"
                      onClick={addToCart}

                    >
                      <span>Add to Cart</span>
                      <HiOutlineArrowCircleRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
