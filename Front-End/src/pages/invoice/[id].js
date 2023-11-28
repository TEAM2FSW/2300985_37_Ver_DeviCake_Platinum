import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React from 'react';
import Invoice from '@/components/Invoice';
import Navbar2 from '@/components/Navbar2';
import {getOrderByIdOrder} from '@/rest/api';


const InvoicePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) { // Pastikan id tersedia sebelum memanggil API
      const fetchData = async () => {
        try {
          const orderData = await getOrderByIdOrder(id);
          setOrder(orderData);
        } catch (error) {
          console.error('Failed to fetch order:', error);
        }
      };
      fetchData();
    }
  }, [id]);


  if (!order) {
    return <div>Loading...</div>;
  }

  return <div>
  <Navbar2/>
  <Invoice order={order} />
</div>;
};

export default InvoicePage;