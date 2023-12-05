import React, { useState, useEffect } from "react";
import { getOrders } from '@/rest/api';
import ReactHTMLTableToExcel from "react-html-table-to-excel";


const Order = () => {

    const [orders, setOrders] = useState([]);
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
    const [filterOrderStatus, setFilterOrderStatus] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders
        .filter(order => {
            return filterPaymentStatus === '' || (order.Payments && order.Payments[0].status === filterPaymentStatus);
        })
        .filter(order => {
            return filterOrderStatus === '' || order.status === filterOrderStatus;
        });

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Function to calculate due date
    const calculateDueDate = (orderDate) => {
        const dueDate = new Date(orderDate);
        const currentDate = new Date();
        const timeDiff = dueDate.getTime() - currentDate.getTime();

        // Calculate the difference in days
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return daysDiff > 0 ? `${daysDiff} days remaining` : 'Due date passed';
    }




    const getPaymentStatus = (status) => {
        const statusMapping = {
            'Pending': 'Belum Bayar',
            'Completed': 'Sudah Bayar',
            'Failed': 'Gagal Bayar'
        };
        return statusMapping[status] || status;
    }

    const translateStatus = (status) => {
        const statusTranslations = {
            'Pending': 'Menunggu',
            'InProcess': 'Sedang Diproses',
            'Shipped': 'Dikirim',
            'Delivered': 'Terkirim'
        };
        return statusTranslations[status] || status;
    };




    return (

        <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold">Products Order</h2>
                    <span className="text-xs">All products item</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                    </div>
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                            table="table-to-xls"
                            filename="Table Pemesanan"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                        />
                        {/* <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button> */}
                    </div>
                </div>
            </div>
            <div>
                <select
                    className="mr-2 p-2"
                    value={filterPaymentStatus}
                    onChange={(e) => setFilterPaymentStatus(e.target.value)}
                >
                    <option value="">All Payment Statuses</option>
                    <option value="Pending">Belum Bayar</option>
                    <option value="Completed">Sudah Bayar</option>
                    <option value="Failed">Gagal Bayar</option>
                </select>
                <select
                    className="p-2"
                    value={filterOrderStatus}
                    onChange={(e) => setFilterOrderStatus(e.target.value)}
                >
                    <option value="">All Order Statuses</option>
                    <option value="Pending">Menunggu</option>
                    <option value="InProcess">Sedang Diproses</option>
                    <option value="Shipped">Dikirim</option>
                    <option value="Delivered">Terkirim</option>
                </select>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal"  id="table-to-xls">

                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Customer Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Order Products
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ordered at
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    DUE DATE
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Delivery Address
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.order_id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            {/* <div className="flex-shrink-0 w-10 h-10">
                                        <img className="w-full h-full rounded-full"
                                             src={order.User.profile_image}
                                             alt={order.User.full_name} />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {order.User.full_name}
                                        </p>
                                    </div> */}
                                            {order.User && order.User.profile_image && order.User.full_name && (
                                                <div className="flex">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-full h-full rounded-full"
                                                            src={order.User.profile_image}
                                                            alt={order.User.full_name} />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {order.User.full_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {order.OrderDetails.map(detail => (
                                            <div key={detail.order_detail_id}>
                                                {
                                                    detail && detail.Cake
                                                        ? <div key={detail.order_detail_id}>{detail.Cake.name}</div>
                                                        : null
                                                }
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {formatDate(order.order_date)}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {calculateDueDate(order.order_date)}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {/* Delivery Address */}
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {order.Address ? `${order.Address.recipient_name}, ${order.Address.phone_number} ` : 'No address'}
                                        </p>
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {order.Address ? `${order.Address.address} ` : ''}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {/* Payment Status */}
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {order.Payments && order.Payments.length > 0
                                                ? getPaymentStatus(order.Payments[0].status)
                                                : 'No payment info'}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {/* Order Status */}
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {translateStatus(order.status)}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {/* Action Button */}
                                        {order.Payments && order.Payments.length > 0 && order.Payments[0].status === 'Completed' && order.status === 'Pending' ?
                                            <button
                                                className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                                                onClick={() => {/* handle your process order logic here */ }}
                                            >
                                                Process Order
                                            </button>
                                            : null
                                        }
                                        {order.Payments && order.Payments.length > 0 && order.Payments[0].status === 'Completed' && order.status === 'InProcess' ?
                                            <button
                                                className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                                                onClick={() => {/* handle your process order logic here */ }}
                                            >
                                                Kirim Order
                                            </button>
                                            : null
                                        }
                                        {order.Payments && order.Payments.length > 0 && order.Payments[0].status === 'Completed' && order.status === 'Shipped' ?
                                            <button
                                                className="text-white bg-blue-500 hover:bg-blue-700 font-medium py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                                                onClick={() => {/* handle your process order logic here */ }}
                                            >
                                                Selesai Order
                                            </button>
                                            : null
                                        }
                                    </td>
                                    {/* ... other columns ... */}
                                </tr>
                            ))}



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

    )
}

export default Order;