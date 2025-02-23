"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '@/_components/common/Input/Input';
import Button from '@/_components/common/Button';
import { useRouter } from 'next/navigation';
import { acceptGroupInvitation } from '@/_lib/api/group-api'; 
import { useUser } from '@/_hooks/useUser'; 

export default function TeamJoin() {
    const { useGetUserInfo } = useUser();
    const userEmail = useGetUserInfo.data?.email;
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const queryClient = useQueryClient();

    const useAcceptGroupInvitation = useMutation({
    mutationFn: (data: { userEmail: string; token: string }) =>
        acceptGroupInvitation(data.userEmail, data.token),
    onSuccess: (data) => {
        queryClient.setQueryData(['group', data.id], data);
        queryClient.invalidateQueries({ queryKey: ['group', data.id] });
        alert('팀에 성공적으로 참여했습니다.');
        router.push('/team'); 
    },
    onError: () => {
        setError('유효하지 않은 초대입니다.');
    },
    });

    const extractToken = (input: string) => {
        const match = input.match(/invite\/([a-zA-Z0-9_-]+)$/);
        return match ? match[1] : input;
    };

    const handleJoin = () => {
        const token = extractToken(inviteCode);
        if (!userEmail || !token) {
            setError('올바른 팀 코드를 입력해주세요.');
            return;
        }
        useAcceptGroupInvitation.mutate({ userEmail, token });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInviteCode(e.target.value);
        setError('');
    };

    return (
        <div className="flex flex-col items-center min-h-screen text-text-primary mt-[13.2rem] tablet:mt-[16rem] pc:mt-[20rem] gap-[2.4rem]">
            <h1 className="text-2xl font-medium mb-[4rem] pc:text-4xl">팀 참여하기</h1>
            <div className="flex flex-col w-[34.3rem] tablet:w-[46rem]">
                <Input
                    label="팀 코드"
                    placeholder="팀 링크를 입력해주세요."
                    value={inviteCode}
                    onChange={handleInputChange}
                    error={!!error}
                    className="mb-[1rem] h-[4.4rem] tablet:h-[4.8rem]"
                />
                {error && <p className="text-status-danger text-[1.4rem]">{error}</p>}
                <div className="mt-[2rem]">
                <Button 
                    onClick={handleJoin} 
                    size="large" 
                    variant="default" 
                    className="w-full h-[4.7rem] font-semibold text-[1.6rem] text-text-inverse ">
                    참여하기
                </Button>
                <p className="mt-[2rem] text-[1.4rem] font-normal tablet:text-[1.6rem] text-center">
                    공유받은 팀 링크를 입력해 참여할 수 있어요.
                </p>
                </div>
            </div>
        </div>
    );
}

