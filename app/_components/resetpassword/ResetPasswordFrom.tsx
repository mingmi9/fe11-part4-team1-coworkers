'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/_components/common/Input/PasswordInput';
import Button from '@/_components/common/Button';
import ResetPasswordModal from '@/_components/modal/ResetPasswordModal';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/_lib/api/user-api';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = new URLSearchParams();
  // const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 모달 창 열림 상태 (링크 요청)
  const [modalOpen, setModalOpen] = useState(false);

  // 토큰이 있을 때 localStorage에 저장된 비밀번호 값을 불러옴
  useEffect(() => {
    if (token) {
      const savedPassword = localStorage.getItem('resetPassword');
      const savedPasswordConfirmation = localStorage.getItem(
        'resetPasswordConfirmation',
      );
      if (savedPassword) setNewPassword(savedPassword);
      if (savedPasswordConfirmation)
        setPasswordConfirmation(savedPasswordConfirmation);
    }
  }, [token]);

  // 비밀번호 재설정 API 호출
  const { mutate: resetPasswordMutate, isPending } = useMutation({
    mutationFn: (data: {
      token: string;
      password: string;
      passwordConfirmation: string;
    }) => resetPassword(data.token, data.password, data.passwordConfirmation),
    onSuccess: () => {
      setSuccessMessage('비밀번호 재설정이 완료되었습니다.');
      setError('');
      localStorage.removeItem('resetPassword');
      localStorage.removeItem('resetPasswordConfirmation');
      router.push('/login');
    },
    onError: () => {
      setError('비밀번호 재설정에 실패했습니다.');
      setSuccessMessage('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !passwordConfirmation) {
      setError('비밀번호를 입력해주세요');
      return;
    }
    if (newPassword !== passwordConfirmation) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!token) {
      localStorage.setItem('resetPassword', newPassword);
      localStorage.setItem('resetPasswordConfirmation', passwordConfirmation);
      setModalOpen(true);
      return;
    }
    resetPasswordMutate({ token, password: newPassword, passwordConfirmation });
  };

  return (
    <div className="mt-[4rem] gap-[4rem] tablet:mt-[16rem] pc:mt-[20rem]">
      <h1 className="mb-[4rem] text-center text-2xl font-medium tablet:mb-[8rem] pc:text-4xl">
        비밀번호 재설정
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-[34.3rem] flex-col gap-[2rem] tablet:w-[46rem]"
      >
        <PasswordInput
          label="새 비밀번호"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError('');
          }}
          placeholder="비밀번호(영문, 숫자 포함, 12자 이내)를 입력해주세요."
          error={!!error}
          errorMessage={error}
          className="w-full mobile:h-[4.4rem] tablet:h-[4.8rem] pc:h-[4.8rem]"
        />
        <PasswordInput
          label="비밀번호 확인"
          value={passwordConfirmation}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
            setError('');
          }}
          placeholder="새 비밀번호를 다시 한번 입력해주세요."
          error={!!error}
          errorMessage={error}
          className="w-full mobile:h-[4.4rem] tablet:h-[4.8rem] pc:h-[4.8rem]"
        />

        <div className="mt-[2rem]">
          <Button
            size="large"
            variant="default"
            disabled={isPending}
            icon="none"
            round="xl"
            className="h-[4.7rem] w-full"
          >
            {isPending ? '진행 중...' : '재설정'}
          </Button>
        </div>
      </form>

      {successMessage && (
        <p className="mt-[1rem] text-[1.4rem] text-brand-primary">
          {successMessage}
        </p>
      )}

      <ResetPasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
