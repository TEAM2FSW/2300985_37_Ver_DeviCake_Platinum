import axios from "axios";
import { getCookie } from "@/utils/cookies";
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

const getToken = async () => {
    const { accessToken } = JSON.parse(getCookie("adminData"));
  
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    }
  };

export const postLogin = async ({ email, password }) => {
    try {
      const response = await api.post("/api/users/admin/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    }
  };

export const getCakes = async () => {
    try {
        await getToken();
        const response = await api.get('/api/cakes');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const postCakes = async ({
    name, description, price, image, category
  }) => {
    try {
        await getToken();
        const response = await api.post('/api/cakes', {
          user_id: 3,
          name,
          description,
          price,
          category,
          image: image
        });
        return response.data;
    } catch (error) {
        if (error) {
            alert(error.response.data.message);            
        }
    }
  }

  export const deleteCake = async ({ cake_id }) => {
    try {
        await getToken();
        const response = await api.delete('/api/cakes/' + cake_id);
        return response.data;
    } catch (error) {
        if (error) {
            alert(error.response.data.message);            
        }
    }
  }


  export const getOrders = async () => {
    try {
        await getToken();
        const response = await api.get('/api/orders');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getCountOrders = async () => {
    try {
        await getToken();
        const response = await api.get('/api/orders/count');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () => {
    try {
        await getToken();
        const response = await api.get('/api/users');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

export const getCountUsers = async () => {
    try {
        await getToken();
        const response = await api.get('/api/users/count');
        return response.data.data;
    } catch (error) {
        throw error;
    }
}


export const deleteUser = async ({ user_id }) => {
    try {
        await getToken();
        const response = await api.delete('/api/users/' + user_id);
        return response.data;
    } catch (error) {
        if (error) {
            alert(error.response.data.message);            
        }
    }
  }