import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

const getToken = async () => {
  const { accessToken } = JSON.parse(getCookie('userData'));

  if (accessToken) {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }
}


let userData;


  const userDataString = getCookie("userData");

  if (userDataString) {
    userData = JSON.parse(userDataString);
  } 

export const postLogin = async ({
     email, password
}) => {
    try {
        const response = await api.post('/api/users/login', {
            email,
            password,
        });
        return response.data;
        
    } catch (error) {
        if (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });        
        }
    }
}

export const postRegistrtion = async ({
  full_name, phone_number, email, password, imageUrl
}) => {
  try {
      const response = await api.post('/api/users/register', {
        full_name,
        phone_number,
        email,
        password,
        profile_image: imageUrl
      });
      return response.data;
  } catch (error) {
      if (error) {
          //alert(error.response.data.message);      
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });     
      }
  }
}

export const getCakes = async () => {
    try {
        await getToken();
        const response = await api.get('/api/cakes');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}


export const postCartItem = async ({ cakeId, quantity }) => {
    try {
        await getToken();
        const response = await api.post('/api/cartitems', {
          userId: userData.user_id,
          cakeId,
          quantity
        });
        return response.data;
    } catch (error) {
        if (error) {
          toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000
          });              
        }
    }
  }
  
  export const getCart = async () => {
    try {
        await getToken();
        const response = await api.get('/api/cartitems/list/' + userData.user_id);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const deleteCartItem = async ({ cart_item_id }) => {
    try {
        await getToken();
        const response = await api.delete('/api/cartitems/' + cart_item_id);
        return response.data;
    } catch (error) {
        if (error) {
            alert(error.response.data.message);            
        }
    }
  }

  export const updateCartQuantity = async ({ cart_item_id, quantity }) => {
    try {
        await getToken();
        const response = await api.put('/api/cartitems/'+ cart_item_id +'/quantity', {
          quantity
        });
        return response.data;
    } catch (error) {
        if (error) {
            alert(error.response.data.message);            
        }
    }
  }

  export const postCheckout = async ({
    recipient_name, phone_number, address,address_id, tanggal, waktu, paymentMethod
  }) => {
    try {
        await getToken();
        const response = await api.post('/api/orders/all', {
          user_id: userData.user_id,
          recipient_name,
          phone_number,
          address,
          address_id,
          tanggal,
          waktu,
          paymentMethod
        });
        return response.data;
    } catch (error) {
        if (error) {
            alert(error.response.data.message);            
        }
    }
  }

  export const getOrderByIdUser = async () => {
    try {
        await getToken();
        const response = await api.get('/api/orders/user/' + userData.user_id);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const getAddress = async () => {
    try {
        await getToken();
        const response = await api.get('/api/addresses/user/' + userData.user_id);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
export const getOrderByIdOrder = async (order_id) => {
    try {
        await getToken();
        const response = await api.get('/api/orders/' + order_id);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const updateAlamat = async (payload, address_id) => {
    try {
      await getToken();
      const response = await api.put(`/api/addresses/${address_id}`, payload);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        console.error('Error:', error);
      }
    }
  };

  
export const deleteAlamat = async (address_id) => {
    try {
      await getToken();
      const response = await api.put(`/api/addresses/${address_id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        console.error('Error:', error);
      }
    }
  };