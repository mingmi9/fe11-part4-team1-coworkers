'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '@/_components/common/Input/Input';
import Button from '@/_components/common/Button';
import { createGroup } from '@/_lib/api/group-api';
import { uploadImage } from '@/_lib/api/image-api';
import { AxiosError } from 'axios';
import Image from 'next/image';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const AddTeamForm: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [teamName, setTeamName] = useState('');
  const [teamProfile, setTeamProfile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const createGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      queryClient.setQueryData(['group', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['group'] });
      router.push(`/team/${data.id}`);
      window.location.reload();
    },
    onError: () => {
      setError('팀 생성 중 오류가 발생했습니다.');
    },
  });

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
    if (error) setError('');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setError('파일 크기가 너무 큽니다. 2MB 이하의 이미지를 선택하세요.');
        return;
      }
      setTeamProfile(file);
      setError('');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!teamName) {
      setError('팀 이름을 입력하세요.');
      return;
    }

    try {
      let imageUrl = '';
      if (teamProfile) {
        const uploadResponse = await uploadImage(teamProfile);
        imageUrl = uploadResponse.url;
      }
      createGroupMutation.mutate({ image: imageUrl, name: teamName });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message || '이미지 업로드에 실패했습니다.',
        );
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex min-h-screen w-[34.3rem] flex-col items-center justify-center gap-[3rem] px-6 py-12 text-text-primary tablet:w-[46rem] tablet:px-10">
      <h1 className="mb-[3rem] text-center text-[2.4rem] font-medium tablet:text-[4rem]">
        팀 생성하기
      </h1>

      <div className="flex w-full flex-col gap-[1rem]">
        <div className="flex flex-col items-start">
          <p className="mb-2 text-[1.6rem] font-medium">팀 프로필</p>
          <div
            className="relative mb-3 h-[7rem] w-[7rem] cursor-pointer"
            onClick={handleUploadClick}
          >
            <Image
              src="/icons/addteam.svg"
              alt="팀 프로필 배경"
              width={64}
              height={64}
              className="absolute"
            />
            {teamProfile ? (
              <Image
                src={URL.createObjectURL(teamProfile)}
                alt="팀 프로필 이미지"
                layout="fill"
                className="rounded-full object-cover"
              />
            ) : null}
            <div className="absolute bottom-0 right-0 h-[2.6rem] w-[2.6rem]">
              <Image
                src="/icons/btn_edit.svg"
                alt="수정 버튼"
                width={18}
                height={18}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <Input
            label="팀 이름"
            value={teamName}
            onChange={handleTeamNameChange}
            placeholder="팀 이름을 입력하세요."
            error={!!error}
            errorMessage={error}
            className="h-[4.4rem] px-[1.6rem] tablet:h-[4.8rem]"
          />
        </div>
      </div>

      <Button
        className="mt-4 flex w-full items-center justify-center text-[1.8rem] font-semibold text-text-inverse"
        onClick={handleSubmit}
        disabled={createGroupMutation.isPending}
        size="large"
      >
        {createGroupMutation.isPending ? '생성 중...' : '생성하기'}
      </Button>

      <p className="mt-1 w-full text-center text-[1.3rem] font-normal tablet:text-[1.6rem]">
        팀 이름은 회사명이나 모임 이름 등으로 설정하는 것이 좋아요.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleProfileChange}
        className="hidden"
      />
    </div>
  );
};

export default AddTeamForm;
