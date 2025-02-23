'use client';

import { useState } from 'react';
import { Modal } from '@/_components/common/Modal';
import Button from '@/_components/common/Button';
import EmailInput from '@/_components/common/Input/EmailInput';
import { sendResetPasswordEmail } from '@/_lib/api/user-api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios'; 

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState(''); 

  const { mutate: sendEmailMutate, isPending } = useMutation({
    mutationFn: ({ email, redirectUrl }: { email: string; redirectUrl: string }) =>
      sendResetPasswordEmail(email, redirectUrl),
    onSuccess: () => {
      setSuccessMessage('비밀번호 재설정 링크가 전송되었습니다.');
      setError('');
      setServerError(''); 
    },
    onError: (error: unknown) => {
      
      if (error instanceof AxiosError && error.response?.data?.message) {
        setServerError(error.response.data.message); 
      } else {
        setError('비밀번호 재설정 링크 전송에 실패했습니다.');
      }
      setSuccessMessage('');
    },
  });

  const handleSendLink = () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setServerError(''); 
    const redirectUrl = `${window.location.origin}`;
    sendEmailMutate({ email, redirectUrl });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-[0.8rem] flex flex-col">
        <Modal.Title
          title="비밀번호 재설정"
          subTitle="비밀번호 재설정 링크를 보내드립니다."
          className="mt-[4.8rem] flex flex-col"
        />
      </div>
      <div className="mb-[2.4rem] flex flex-col items-start">
        <EmailInput
          placeholder="이메일을 입력하세요."
          className="w-[28rem] h-[4.4rem] tablet:h-[4.8rem]"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
            setServerError(''); 
          }}
          errorMessage={serverError || error} 
        />
        {successMessage && <p className="text-brand-primary mt-[1rem]">{successMessage}</p>}
      </div>

      <div className="mb-[3.2rem] flex flex-row gap-[0.8rem]">
        <Button size="modal-small" variant="outlined" onClick={onClose}>
          닫기
        </Button>
        <Button
          size="modal-small"
          variant="default"
          onClick={handleSendLink}
          disabled={isPending}
        >
          {isPending ? '전송 중...' : '링크 보내기'}
        </Button>
      </div>
    </Modal>
  );
}

