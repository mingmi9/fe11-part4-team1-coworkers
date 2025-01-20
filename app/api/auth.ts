import { instance } from './axios-instance';

export async function signUp(data: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}) {
  const response = await instance.post(`/auth/signUp`, data);
  return response.data;
}

export async function signIn(data: { email: string; password: string }) {
  const response = await instance.post(`/auth/signIn`, data);
  return response.data;
}
