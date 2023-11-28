import React from 'react';
import Invoice from '@/components/Invoice';
import Navbar2 from '@/components/Navbar2';
const InvoicePage = () => {

    const order = {
        "order_id": 13,
        "user_id": 3,
        "total_price": 47000,
        "order_date": "2023-11-25T12:40:00.000Z",
        "address_id": 3,
        "status": "Pending",
        "active": true,
        "createdAt": "2023-11-23T09:41:33.540Z",
        "updatedAt": "2023-11-23T09:41:33.540Z",
        "OrderDetails": [
            {
                "order_detail_id": 21,
                "order_id": 13,
                "cake_id": 26,
                "quantity": 1,
                "sub_total": 15000,
                "createdAt": "2023-11-23T09:41:34.635Z",
                "updatedAt": "2023-11-23T09:41:34.635Z",
                "Cake": {
                    "cake_id": 26,
                    "user_id": 3,
                    "name": "Churros",
                    "description": "Crispy and sweet churros, served with a delicious chocolate sauce",
                    "price": 15000,
                    "image": "https://images.pexels.com/photos/372851/pexels-photo-372851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "active": true,
                    "category": "bakery",
                    "createdAt": "2023-11-19T00:08:44.769Z",
                    "updatedAt": "2023-11-19T00:08:44.769Z"
                }
            },
            {
                "order_detail_id": 22,
                "order_id": 13,
                "cake_id": 20,
                "quantity": 2,
                "sub_total": 32000,
                "createdAt": "2023-11-23T09:41:34.965Z",
                "updatedAt": "2023-11-23T09:41:34.965Z",
                "Cake": {
                    "cake_id": 20,
                    "user_id": 3,
                    "name": "Brownies",
                    "description": "Rich and chocolatey brownies",
                    "price": 16000,
                    "image": "https://images.pexels.com/photos/2612373/pexels-photo-2612373.jpeg?auto=compress&cs=tinysrgb&w=1600",
                    "active": true,
                    "category": "cakes",
                    "createdAt": "2023-11-19T00:07:59.226Z",
                    "updatedAt": "2023-11-19T00:07:59.226Z"
                }
            }
        ],
        "Payments": 
            {
                "payment_id": 12,
                "invoice": "INV/20231123/094135/95201",
                "order_id": 13,
                "payment_date": "2023-11-23T09:41:35.201Z",
                "amount": 47000,
                "payment_method": "COD",
                "status": "Pending",
                "invoice_due_date": "2023-11-25T09:41:35.105Z",
                "active": true,
                "createdAt": "2023-11-23T09:41:35.201Z",
                "updatedAt": "2023-11-23T09:41:35.201Z"
            },
        "Address": {
            "address_id": 3,
            "user_id": 3,
            "recipient_name": "Ersan Putra",
            "address": "Perum Griya Amanah Blok A no 17",
            "phone_number": "083866034541",
            "active": true,
            "createdAt": "2023-11-23T09:41:32.317Z",
            "updatedAt": "2023-11-23T09:41:32.317Z"
        }
    };
      
      
  return (
    <div>
      <Navbar2/>
      <Invoice order={order} />
    </div>
  );
};

export default InvoicePage;
