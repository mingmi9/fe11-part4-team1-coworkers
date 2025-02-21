import { instance } from '../axios-instance';

// 그룹 정보 조회
export const getGroupInfo = async (id: number, config = {}) => {
  const response = await instance.get(`/groups/${id}`, config);
  return response.data;
};

// 그룹 정보 수정
export const updateGroupInfo = async (
  id: number,
  data: { image: string; name: string },
  config = {},
) => {
  const response = await instance.patch(`/groups/${id}`, data, config);
  return response.data;
};

// 그룹 삭제
export const deleteGroupInfo = async (id: number) => {
  const response = await instance.delete(`/groups/${id}`);
  return response.status;
};

// 그룹 생성
export const createGroup = async (data: { image: string; name: string }) => {
  const response = await instance.post(`/groups`, data);
  return response.data;
};

// 그룹 멤버 조회
export const getGroupMember = async (id: number, memberUserId: number) => {
  const response = await instance.get(`/groups/${id}/member/${memberUserId}`);
  return response.data;
};

// 그룹 멤버 삭제
export const deleteGroupMember = async (id: number, memberUserId: number) => {
  const response = await instance.delete(
    `/groups/${id}/member/${memberUserId}`,
  );
  return response.status;
};

// 초대 링크 생성
export const createGroupInvitation = async (id: number) => {
  const response = await instance.get(`/groups/${id}/invitation`);
  return response.data;
};

// 초대 수락
export const acceptGroupInvitation = async (
  userEmail: string,
  token: string,
) => {
  const response = await instance.post(`/groups/accept-invitation`, {
    token,
    userEmail,
  });
  return response.data;
};

// 그룹 멤버 추가
export const addGroupMember = async (id: number, userEmail: string) => {
  const response = await instance.post(`/groups/${id}/member`, { userEmail });
  return response.status;
};

// 특정 일자 할 일 리스트
export const getGroupTasks = async (id: number, date: string) => {
  const response = await instance.get(`/groups/${id}/tasks`, {
    params: { date },
  });
  return response.data;
};
