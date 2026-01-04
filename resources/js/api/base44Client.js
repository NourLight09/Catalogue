import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add CSRF token to requests
api.interceptors.request.use((config) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.content;
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or handle auth error
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    // Get current user
    me: async () => {
      try {
        const response = await api.get('/user');
        return response.data;
      } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
      }
    },

    // Update current user
    updateMe: async (data) => {
      try {
        const response = await api.put('/user', data);
        return response.data;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    },

    // Logout
    logout: async () => {
      try {
        await api.post('/logout');
        window.location.href = '/';
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  },

  entities: {
    Product: {
      list: async () => {
        try {
          const response = await api.get('/products');
          return response.data || [];
        } catch (error) {
          console.error('Error fetching products:', error);
          return [];
        }
      },

      get: async (id) => {
        try {
          const response = await api.get(`/products/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching product:', error);
          return null;
        }
      },

      create: async (data) => {
        try {
          const response = await api.post('/products', data);
          return response.data;
        } catch (error) {
          console.error('Error creating product:', error);
          throw error;
        }
      },

      update: async (id, data) => {
        try {
          const response = await api.put(`/products/${id}`, data);
          return response.data;
        } catch (error) {
          console.error('Error updating product:', error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          const response = await api.delete(`/products/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting product:', error);
          throw error;
        }
      },
    },

    Category: {
      list: async () => {
        try {
          const response = await api.get('/categories');
          return response.data || [];
        } catch (error) {
          console.error('Error fetching categories:', error);
          return [];
        }
      },

      get: async (id) => {
        try {
          const response = await api.get(`/categories/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching category:', error);
          return null;
        }
      },

      create: async (data) => {
        try {
          const response = await api.post('/categories', data);
          return response.data;
        } catch (error) {
          console.error('Error creating category:', error);
          throw error;
        }
      },

      update: async (id, data) => {
        try {
          const response = await api.put(`/categories/${id}`, data);
          return response.data;
        } catch (error) {
          console.error('Error updating category:', error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          const response = await api.delete(`/categories/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting category:', error);
          throw error;
        }
      },
    },

    User: {
      list: async () => {
        try {
          const response = await api.get('/users');
          return response.data || [];
        } catch (error) {
          console.error('Error fetching users:', error);
          return [];
        }
      },

      get: async (id) => {
        try {
          const response = await api.get(`/users/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
          return null;
        }
      },

      update: async (id, data) => {
        try {
          const response = await api.put(`/users/${id}`, data);
          return response.data;
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          const response = await api.delete(`/users/${id}`);
          return response.data;
        } catch (error) {
          console.error('Error deleting user:', error);
          throw error;
        }
      },
    },
  },
};

export default api;

