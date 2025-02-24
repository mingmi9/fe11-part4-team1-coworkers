import {
  changePassword,
  deleteUser,
  getUserGroups,
  getUserHistory,
  getUserInfo,
  getUserMemberships,
  resetPassword,
  sendResetPasswordEmail,
  updateUserInfo,
} from '@/_lib/api/user-api';
import { useUserStore } from '@/_store/user-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOptimisticUpdate } from './useOptimisticUpdate';

export const useUser = (options = {}) => {
  const { clearUser } = useUserStore();
  const queryClient = useQueryClient();

  // 유저 정보 조회
  const useGetUserInfo = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    ...options,
  });

  //유저 정보 수정
  const useUpdateUserInfo = useOptimisticUpdate({
    mutationFn: (data: { nickname: string; image: string }) =>
      updateUserInfo(data),
    queryKey: ['user'],
    updater: (oldData, newData) => ({
      ...oldData,
      ...newData,
    }),
  });

  // 회원 탈퇴
  const useDeleteUser = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearUser();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // 유저가 속한 그룹 목록 조회
  const useGetUserGroups = useQuery({
    queryKey: ['userGroups'],
    queryFn: getUserGroups,
    ...options,
  });

  // 유저의 멤버십 정보 조회
  const useGetUserMemberships = useQuery({
    queryKey: ['userMemberships'],
    queryFn: getUserMemberships,
    ...options,
  });

  // 유저가 완료한 작업 조회
  const useGetUserHistory = useQuery({
    queryKey: ['userHistory'],
    queryFn: getUserHistory,
    ...options,
  });

  // 비밀번호 재설정 이메일 전송
  const useSendResetPasswordEmail = useMutation({
    mutationFn: ({
      email,
      redirectUrl,
    }: {
      email: string;
      redirectUrl: string;
    }) => sendResetPasswordEmail(email, redirectUrl),
    onSuccess: (response: { message: string }) => {
      console.log(response.message);
    },
  });

  // 비밀번호 재설정
  const useResetPassword = useMutation({
    mutationFn: ({
      token,
      password,
      passwordConfirmation,
    }: {
      token: string;
      password: string;
      passwordConfirmation: string;
    }) => resetPassword(token,password, passwordConfirmation),
    onSuccess: (response: { message: string }) => {
      console.log(response.message);
    },
  });

  // 비밀번호 변경
  const usePassword = useMutation({
    mutationFn: ({
      password,
      passwordConfirmation,
    }: {
      password: string;
      passwordConfirmation: string;
    }) => changePassword(password, passwordConfirmation),
    onSuccess: (response: { message: string }) => {
      console.log(response.message);
    },
  });

  return {
    useGetUserInfo,
    useUpdateUserInfo,
    useDeleteUser,
    useGetUserGroups,
    useGetUserMemberships,
    useGetUserHistory,
    useSendResetPasswordEmail,
    useResetPassword,
    usePassword,
  };
};
