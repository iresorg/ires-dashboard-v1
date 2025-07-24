import api from '@shared/services/api';
import Cookies from 'js-cookie';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string | null;
  status: string;
}

export interface LoginResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export const login = async (payload: LoginPayload): Promise<User> => {
  const response = await api.post<LoginResponse>('/auth/login', payload);
  const { user, accessToken } = response.data.data;
  Cookies.set('token', accessToken, { expires: 7 }); // 7 days expiry
  return user;
};

export const logout = () => {
  Cookies.remove('token');
  window.location.href = '/login';
}; 