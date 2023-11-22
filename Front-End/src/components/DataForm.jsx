// pages/index.js
import Head from 'next/head';

const Checkout = () => {
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
        <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
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
            <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="rounded-md">
            <form id="payment-form" method="POST" action="">
              <section>
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  PENGIRIMAN DAN PEMBAYARAN
                </h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Name</span>
                    <input
                      name="name"
                      className="focus:outline-none px-3"
                      placeholder="Asep"
                      required=""
                    />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">Alamat</span>
                    <input
                      name="alamat"
                      type="text"
                      className="focus:outline-none px-3"
                      placeholder="Jalan Jakarta Barat no.Papua Timur"
                      required="yes"
                    />
                  </label>
                  {/* ... Rest of the form fields ... */}
                </fieldset>
              </section>
            </form>
          </div>
          <div className="rounded-md">
      
          </div>
          <button className="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
            Pay Rp.100.000.000
          </button>
        </div>
        <div className="col-span-1 bg-white lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
          <ul className="py-6 border-b space-y-6 px-8">
            {/* Item Muncul */}

            <li className="grid grid-cols-6 gap-2 border-b-1">
  <div className="col-span-1 self-center">
    <img src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Product" className="rounded w-full" />
  </div>
  <div className="flex flex-col col-span-3 pt-2">
    <span className="text-gray-600 text-md font-semi-bold">Cheese Cake</span>
    <span className="text-gray-400 text-sm inline-block pt-2">Cheese Cake</span>
  </div>
  <div className="col-span-2 pt-3">
    <div className="flex items-center space-x-2 text-sm justify-between">
      <span className="text-gray-400">2 x Rp.100.000.000</span>
      <span className="text-pink-400 font-semibold inline-block">Rp.200.000.000</span>
    </div>
  </div>
</li>


          </ul>
          <div className="px-8 border-b">
            {/* Total */}
          </div>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span> Pay Rp.100.000.000 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
