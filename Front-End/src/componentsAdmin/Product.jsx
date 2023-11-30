// components/Product.js
import React, { useState , useEffect} from "react";
import Modal from "react-modal";
import { getCakes } from '@/rest/api';


const Product = () => {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const formatRupiah = (number) => {
    const parts = number.toFixed(0).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${parts.join('.')}`;
  };

  return (
    <div className="p-6 overflow-scroll px-0">
      <h1 className="text-2xl font-semibold mb-4"> Product Page Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div></div> {/* Empty div for spacing */}
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={openModal}
        >
          Add Product
        </button>
      </div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                No
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Product
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Category
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Quantity
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Price
              </p>
            </th>
            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
        {foods.map((food, index) => (
            <tr key={food.cake_id}>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="font-semibold">{index + 1}.</p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <img src={food.image} alt={food.name} className="w-10 h-10 object-cover rounded-md" />
                  <p className="font-semibold">{food.name}</p>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="font-semibold">{food.category}</p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="font-semibold">1</p> {/* Quantity Placeholder */}
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="font-semibold">{formatRupiah(food.price)}</p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <button className="p-2 bg-red-500 text-white rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add Product form */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Add Product Modal"
  className="modal"
  overlayClassName="overlay"
  style={{
    content: {
      width: '90%', // More responsive width
      maxWidth: '600px', // Maximum width
      height: 'auto', // Auto height for content flexibility
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      border: '1px solid #ddd', // Softer border
      borderRadius: '12px', // Rounded corners
      background: '#fff',
      padding: '20px', // Padding inside the modal
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for better focus
    },
  }}
>
  <div>
    <h2 className="text-2xl mb-6 font-semibold text-center">Add Product</h2>
    <form>
      {/* Form fields with improved layout */}
      <div className="mb-4">
    <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
      Product Name
    </label>
    <input
      type="text"
      id="productName"
      name="productName"
      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </div>

  {/* Description Field */}
  <div className="mb-4">
    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
      Description
    </label>
    <textarea
      id="description"
      name="description"
      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    ></textarea>
  </div>

  {/* Price Field */}
  <div className="mb-4">
    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
      Price
    </label>
    <input
      type="number"
      id="price"
      name="price"
      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </div>

  {/* Image URL Field */}
  <div className="mb-4">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
      Image URL
    </label>
    <input
      type="text"
      id="image"
      name="image"
      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </div>

  {/* Category Field */}
  <div className="mb-4">
    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
      Category
    </label>
    <input
      type="text"
      id="category"
      name="category"
      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </div>

      {/* Repeat for other fields */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
        <button
          onClick={closeModal}
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </form>
  </div>
</Modal>

    </div>
  );
};

export default Product;
