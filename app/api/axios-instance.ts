import { useAuthStore } from '@/_store/auth-store';
import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async () => {
  try {
    const { refreshToken, user } = useAuthStore.getState();
    if (!refreshToken || !user) {
      throw new Error('토큰 또는 사용자 정보가 없습니다.');
    }

    const response = await instance.post('/auth/refresh-token', {
      refreshToken,
    });

    const { accessToken } = response.data;
    useAuthStore.getState().setAuthData({
      accessToken,
      refreshToken,
      user,
    });

    return accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패', error);
    useAuthStore.getState().clearAuthData();
    throw error;
  }
};

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        useAuthStore.getState().clearAuthData();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
