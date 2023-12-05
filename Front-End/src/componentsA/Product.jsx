// components/Product.js
import React, { useState , useEffect} from "react";
import Modal from "react-modal";
import { getCakes, postCakes, deleteCake } from '@/rest/api';
import { toast } from 'react-toastify';

const Product = () => {
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshCakes, setRefreshCakes] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageUploadUrl, setImageUploadUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadNotification, setImageUploadNotification] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCakeId, setSelectedCakeId] = useState(null);
  const [selectedCakeName, setSelectedCakeName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cakesData = await getCakes();
        setFoods(cakesData);
      } catch (error) {
        console.error('Failed to fetch cakes:', error);
      }
    };
    fetchData();
  }, [refreshCakes]);

  const openModal = () => {
    setModalOpen(true);
    setImageUploadNotification('Please upload an image before submitting.');
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const formatRupiah = (number) => {
    const parts = number.toFixed(0).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Rp. ${parts.join('.')}`;
  };

  const handleImagesChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
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
      setImageUploadNotification('');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!imageUploadUrl) {
    setImageUploadNotification('Please upload an image before submitting.');
    return; // Stop the submission if image is not uploaded
  }

  // Collecting form data
  const formData = {
    name: event.target.productName.value,
    description: event.target.description.value,
    price: event.target.price.value,
    category: event.target.category.value,
    image: imageUploadUrl, // Use the uploaded image URL
  };

  try {
    const result = await postCakes(formData);
    console.log(result);
    setImagePreview(null);
    toast.success("Kue Berhasil ditambahkan!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000
    });
    closeModal(); // Close the modal after successful submission
    setImageUploadNotification('Please upload an image before submitting.');
    setRefreshCakes(prevState => !prevState)
    
    // You may also want to refresh the foods list here
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const handleDelete = async () => {
  if (selectedCakeId) {
    await deleteCake({ cake_id: selectedCakeId });
    toast.success("Kue Berhasil dihapus!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000
    });
    setRefreshCakes(prevState => !prevState); // Trigger re-fetch
    setShowDeleteModal(false); // Close the modal
  }
};

const openDeleteModal = (cakeId, cakeName) => {
  setSelectedCakeId(cakeId);
  setSelectedCakeName(cakeName);
  setShowDeleteModal(true);
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
              <button
          className="p-2 bg-red-500 text-white rounded-md"
          onClick={() => openDeleteModal(food.cake_id, food.name)}
        >Delete</button>
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
    <form onSubmit={handleSubmit}>
      {/* Notification for image upload */}
      
      {/* Image URL Field */}
  <div className="mb-4">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
      Image Upload
    </label>
    <label className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
            <div id="preview-container" className="flex flex-col justify-center items-center w-full h-full">
                {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
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
  {imageUploadNotification && (
              <div className="text-red-500 mb-2">
                {imageUploadNotification}
              </div>
            )} 
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

  <div className="mb-4">
    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
        Category
    </label>
    <select
        id="category"
        name="category"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    >
        <option value="cakes">Cakes</option>
        <option value="pastry">Pastry</option>
        <option value="bakery">Bakery</option>
    </select>
</div>


  

  {/* Category Field */}
 




      {/* Repeat for other fields */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          disabled={!imageUploadUrl}
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

<Modal
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
    <h2 className="text-2xl mb-6 font-semibold text-center">Delete Product</h2>
    
  </div>
</Modal>

<Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
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
        <h2 className="text-2xl mb-6 font-semibold text-center">Delete Product</h2>
        <p>Apakah anda ingin menghapus kue {selectedCakeName} ?</p>
      </div>
        <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          onClick={handleDelete}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Delete Kue
        </button>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
       
      </Modal>

    </div>
  );
};

export default Product;
