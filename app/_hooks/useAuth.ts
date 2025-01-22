import { useAuthStore } from '@store/auth-store';
import { signUp, signIn } from '@lib/api/auth-api';

import { useMutation } from '@tanstack/react-query';

export const useAuthMutation = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData);

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      setAuthData({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      });
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      setAuthData({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      });
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });

  return { signUpMutation, signInMutation };
};
