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

export const useUser = (options = {}) => {
  const { setUser, clearUser } = useUserStore();
  const queryClient = useQueryClient();

  // 유저 정보 조회
  const getUserInfoQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userInfo = await getUserInfo();
      setUser(userInfo);
      return userInfo;
    },
    ...options,
  });

  //유저 정보 수정
  const updateUserInfoMutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (updateUser) => {
      setUser(updateUser);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // 회원 탈퇴
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearUser();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // 유저가 속한 그룹 목록 조회
  const getUserGroupsQuery = useQuery({
    queryKey: ['userGroups'],
    queryFn: getUserGroups,
    ...options,
  });

  // 유저의 멤버십 정보 조회
  const getUserMembershipsQuery = useQuery({
    queryKey: ['userMemberships'],
    queryFn: getUserMemberships,
    ...options,
  });

  // 유저가 완료한 작업 조회
  const getUserHistoryQuery = useQuery({
    queryKey: ['userHistory'],
    queryFn: getUserHistory,
    ...options,
  });

  // 비밀번호 재설정 이메일 전송
  const sendResetPasswordEmailMutation = useMutation({
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
  const resetPasswordMutation = useMutation({
    mutationFn: ({
      token,
      password,
      passwordConfirmation,
    }: {
      token: string;
      password: string;
      passwordConfirmation: string;
    }) => resetPassword(password, passwordConfirmation, token),
    onSuccess: (response: { message: string }) => {
      console.log(response.message);
    },
  });

  // 비밀번호 변경
  const passwordMutation = useMutation({
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
    getUserInfoQuery,
    updateUserInfoMutation,
    deleteUserMutation,
    getUserGroupsQuery,
    getUserMembershipsQuery,
    getUserHistoryQuery,
    sendResetPasswordEmailMutation,
    resetPasswordMutation,
    passwordMutation,
  };
};
