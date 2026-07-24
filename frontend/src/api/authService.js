import axiosClient from './axiosClient';

export const authService = {
  register: async (userData) => {
    const response = await axiosClient.post('/register/', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosClient.post('/login/', credentials);
    const data = response.data;

    if (data.access) {
      localStorage.setItem('token', data.access);
      if (data.refresh) localStorage.setItem('refreshToken', data.refresh);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
