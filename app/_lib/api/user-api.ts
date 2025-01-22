import { instance } from '@lib/axios-instance';

// 유저 정보 조회
export const getUserInfo = async () => {
  const response = await instance.get(`/user`);
  return response.data;
};

// 유저 정보 수정
export const updateUserInfo = async (data: {
  nickname: string;
  image: string;
}) => {
  const response = await instance.patch(`/user`, data);
  return response.data;
};

// 회원 탈퇴
export const deleteUser = async () => {
  const response = await instance.delete(`/user`);
  return response.status;
};

// 유저가 속한 그룹 목록 조회
export const getUserGroups = async () => {
  const response = await instance.get(`/user/groups`);
  return response.data;
};

// 유저의 멤버십 정보 조회
export const getUserMemberships = async () => {
  const response = await instance.get(`/user/memberships`);
  return response.data;
};

// 유저가 완료한 작업 조회
export const getUserHistory = async () => {
  const response = await instance.get(`/user/history`);
  return response.data;
};

// 비밀번호 재설정 이메일 전송
export const sendResetPasswordEmail = async (
  email: string,
  redirectUrl: string,
) => {
  const response = await instance.post(`/user/send-reset-password-email`, {
    email,
    redirectUrl,
  });
  return response.data;
};

// 비밀번호 재설정
export const resetPassword = async (
  token: string,
  password: string,
  passwordConfirmation: string,
) => {
  const response = await instance.patch(`/user/reset-password`, {
    token,
    password,
    passwordConfirmation,
  });
  return response.data;
};

// 비밀번호 변경
export const changePassword = async (
  password: string,
  passwordConfirmation: string,
): Promise<{ message: string }> => {
  const response = await instance.patch(`/user/password`, {
    password,
    passwordConfirmation,
  });
  return response.data;
};
