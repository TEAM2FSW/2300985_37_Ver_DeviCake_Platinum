// components/ContactForm.jsx
import React from 'react';

const DataForm = () => {
  return (
    <form action="" className="form bg-white p-6 my-10 relative">
      <div className="icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5" style={{ left: '-40px' }}>
        <i className="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i>
      </div>
      <h3 className="text-2xl text-gray-900 font-semibold">Your Address!</h3>
      <p className="text-gray-600">To help driver find your place</p>
      <div className="flex space-x-5 mt-3">
        <input type="text" name="" id="" placeholder="Your Name" className="border p-2 w-1/2" />
        <input type="tel" name="" id="" placeholder="Your Number" className="border p-2 w-1/2" />
      </div>
      <input type="email" name="" id="" placeholder="Your Adress" className="border p-2 w-full mt-3" />
      <textarea name="" id="" cols="10" rows="3" placeholder="Notes" className="border p-2 mt-3 w-full"></textarea>

      <div className="flex items-baseline space-x-2 mt-2">


      </div>
      <input type="submit" value="Submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3" />
    </form>
  );
};

export default DataForm;
