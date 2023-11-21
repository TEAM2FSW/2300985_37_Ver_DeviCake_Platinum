// components/Food.jsx
import React, { useEffect, useState } from 'react';
import ProductDetail from './ProductDetail';
import { getCakes } from '@/rest/api';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cakesData = await getCakes();
        setFoods(cakesData);
        setAllFoods(cakesData);
      } catch (error) {
        console.error('Failed to fetch cakes:', error);
      }
    };
    fetchData();
  }, []);

  const filterType = (category) => {
    if (category === 'all') {
      setFoods(allFoods);
    } else {
      setFoods(allFoods.filter((item) => item.category === category));
    }
  };

  const formatRupiah = (number) => {
    const parts = number.toFixed(0).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${parts.join('.')}`;
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Menu Items
      </h1>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Filter Type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={() => filterType('all')}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              All
            </button>
            <button
              onClick={() => filterType('cakes')}
              className="m-1 border-orange-600 text-black font-bold hover:bg-orange-600 hover:text-white border border-white rounded-xl px-5 py-1"
            >
              Cakes
            </button>
            <button
              onClick={() => filterType('pastry')}
              className="m-1 border-orange-600 text-black font-bold hover:bg-orange-600 hover:text-white border border-white rounded-xl px-5 py-1"
            >
              Pastry
            </button>
            <button
              onClick={() => filterType('bakery')}
              className="m-1 border-orange-600 text-black font-bold hover:bg-orange-600 hover:text-white border border-white rounded-xl px-5 py-1"
            >
              Bakery
            </button>
          </div>
        </div>
      </div>

      {/* Display foods */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {foods.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
            onClick={() => handleProductClick(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex flex-col md:flex-row justify-between px-2 py-4">
              <p className="font-bold">{item.name}</p>
              <p>
                <span className="bg-orange-500 text-white p-1 rounded-full">
                  {formatRupiah(item.price)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail */}
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <ProductDetail product={selectedProduct} />
            <button
              onClick={handleCloseProductDetail}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Food;
