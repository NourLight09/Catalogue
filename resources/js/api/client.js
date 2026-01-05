import axios from 'axios';

// Créer une instance axios
const axiosInstance = axios.create({
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Ajouter le jeton CSRF aux requêtes
axiosInstance.interceptors.request.use((config) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.content;
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

// Gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nous ne voulons pas rediriger globalement sur 401 car nous vérifions le statut d'authentification sur les pages publiques
    // if (error.response?.status === 401) {
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    // Récupérer l'utilisateur actuel
    me: async () => {
      try {
        const response = await axiosInstance.get('/current-user');
        return response.data;
      } catch (error) {
        // Si 401, retourner null (non connecté), ne pas loguer l'erreur
        if (error.response && error.response.status === 401) {
          return null;
        }
        console.error('Erreur lors de la récupération de l\'utilisateur actuel:', error);
        return null;
      }
    },

    // Mettre à jour l'utilisateur actuel
    updateMe: async (data) => {
      try {
        const response = await axiosInstance.put('/profile', data);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        throw error;
      }
    },

    // Déconnexion
    logout: async () => {
      try {
        await axiosInstance.post('/logout');
        window.location.href = '/app';
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    },
  },

  entities: {
    Product: {
      list: async () => {
        try {
          const response = await axiosInstance.get('/app/products');
          return response.data || [];
        } catch (error) {
          console.error('Erreur lors de la récupération des produits:', error);
          throw error;
        }
      },

      get: async (id) => {
        try {
          const response = await axiosInstance.get(`/app/products/${id}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération du produit:', error);
          return null;
        }
      },

      create: async (data) => {
        try {
          const response = await axiosInstance.post('/app/products', data);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la création du produit:', error);
          throw error;
        }
      },

      update: async (id, data) => {
        try {
          const response = await axiosInstance.put(`/app/products/${id}`, data);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la mise à jour du produit:', error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          const response = await axiosInstance.delete(`/app/products/${id}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la suppression du produit:', error);
          throw error;
        }
      },
    },

    Category: {
      list: async () => {
        try {
          const response = await axiosInstance.get('/app/categories');
          return response.data || [];
        } catch (error) {
          console.error('Erreur lors de la récupération des catégories:', error);
          throw error;
        }
      },

      get: async (id) => {
        try {
          const response = await axiosInstance.get(`/app/categories/${id}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération de la catégorie:', error);
          return null;
        }
      },

      create: async (data) => {
        try {
          const config = {};
          if (data instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
          }
          const response = await axiosInstance.post('/app/categories', data, config);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la création de la catégorie:', error);
          throw error;
        }
      },

      update: async (id, data) => {
        try {
          const config = {};
          if (data instanceof FormData) {
            config.headers = { 'Content-Type': 'multipart/form-data' };
            // Laravel a besoin de _method=PUT pour FormData car les formulaires HTML ne supportent pas PUT
            data.append('_method', 'PUT');
            const response = await axiosInstance.post(`/app/categories/${id}`, data, config);
            return response.data;
          }
          const response = await axiosInstance.put(`/app/categories/${id}`, data);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la catégorie:', error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          const response = await axiosInstance.delete(`/app/categories/${id}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la suppression de la catégorie:', error);
          throw error;
        }
      },
    },

    User: {
      list: async () => {
        try {
          const response = await axiosInstance.get('/app/users');
          return response.data || [];
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          throw error;
        }
      },

      get: async (id) => {
        try {
          const response = await axiosInstance.get(`/app/users/${id}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
          return null;
        }
      },

      update: async (id, data) => {
        try {
          const response = await axiosInstance.put(`/app/users/${id}`, data);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
          throw error;
        }
      },

      delete: async (id) => {
        try {
          const response = await axiosInstance.delete(`/app/users/${id}`);
          return response.data;
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
          throw error;
        }
      },
    },
  },
};

export default api;
