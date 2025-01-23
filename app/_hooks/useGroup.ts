import {
  acceptGroupInvitation,
  addGroupMember,
  createGroup,
  createGroupInvitation,
  deleteGroupInfo,
  deleteGroupMember,
  getGroupInfo,
  getGroupMember,
  getGroupTasks,
  updateGroupInfo,
} from '@/_lib/api/group-api';
import { useGroupStore } from '@/_store/group-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOptimisticUpdate } from './useOptimisticUpdate';

export const useGroup = (options = {}, id: number) => {
  const { setGroup, clearGroup } = useGroupStore();
  const queryClient = useQueryClient();

  // 그룹 정보 조회
  const useGetGroupInfo = useQuery({
    queryKey: ['group', id],
    queryFn: () => getGroupInfo(id),
    ...options,
  });

  // 그룹 정보 수정
  const useUpdateGroupInfo = useOptimisticUpdate({
    mutationFn: (data: { image: string; name: string }) =>
      updateGroupInfo(id, data),
    queryKey: ['group', id],
    updater: (oldData, newData) => ({
      ...oldData,
      ...newData,
    }),
  });

  // 그룹 삭제
  const useDeleteGroupInfo = useMutation({
    mutationFn: (id: number) => deleteGroupInfo(id),
    onSuccess: () => {
      clearGroup();
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
  });

  // 그룹 생성
  const useCreateGroup = useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      setGroup(data);
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
  });

  // 그룹 멤버 조회
  const useGetGroupMember = useQuery({
    queryKey: ['group', id, 'members'],
    queryFn: () => getGroupMember(id, 0),
    ...options,
  });

  // 그룹 멤버 삭제
  const useDeleteGroupMember = useMutation({
    mutationFn: (memberUserId: number) => deleteGroupMember(id, memberUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', id, 'members'] });
    },
  });

  // 초대 링크 생성
  const useCreateGroupInvitation = useMutation({
    mutationFn: () => createGroupInvitation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groupInvitation', id] });
    },
  });

  // 초대 수락
  const useAcceptGroupInvitation = useMutation({
    mutationFn: (data: { userEmail: string; token: string }) =>
      acceptGroupInvitation(data.userEmail, data.token),
    onSuccess: (data) => {
      setGroup(data);
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
  });

  // 그룹 멤버 추가
  const useAddGroupMember = useMutation({
    mutationFn: (userEmail: string) => addGroupMember(id, userEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', id, 'members'] });
    },
  });

  // 특정 일자 할 일 리스트
  const useGetGroupTasks = (id: number, date: string) =>
    useQuery({
      queryKey: ['group', id, 'tasks', date],
      queryFn: () => getGroupTasks(id, date),
      ...options,
    });

  return {
    useGetGroupInfo,
    useUpdateGroupInfo,
    useDeleteGroupInfo,
    useCreateGroup,
    useGetGroupMember,
    useCreateGroupInvitation,
    useAcceptGroupInvitation,
    useDeleteGroupMember,
    useAddGroupMember,
    useGetGroupTasks,
  };
};
