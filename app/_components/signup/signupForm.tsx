'use client';

import React, { useState, useEffect } from 'react';
import Input from '@/_components/common/Input/Input';
import EmailInput from '@/_components/common/Input/EmailInput';
import PasswordInput from '@/_components/common/Input/PasswordInput';
import Button from '@/_components/common/Button';
import { useAuthStore } from '@/_store/auth-store';
import { useRouter } from 'next/navigation';
import SimpleLogin from '@/_components/login/SimpleLogin';
import { useAuthMutation } from '@/_hooks/useAuth';
import axios from 'axios';

const SignUpForm = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { useSignUp } = useAuthMutation();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const validateEmail = (value: string): string => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return '이메일은 필수 입력입니다.';
    if (!emailPattern.test(value)) return '이메일 형식으로 작성해 주세요.';
    return '';
  };

  const validateNickname = (value: string): string => {
    if (!value) return '닉네임은 필수 입력입니다.';
    if (value.length > 20) return '닉네임은 최대 20자까지 가능합니다.';
    return '';
  };

  const validatePassword = (value: string): string => {
    if (!value) return '비밀번호는 필수 입력입니다.';
    if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    if (!passwordPattern.test(value))
      return '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
    return '';
  };

  const validateConfirmPassword = (value: string): string => {
    if (!value) return '비밀번호 확인을 입력해주세요.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleBlur = (
    field: 'email' | 'nickname' | 'password' | 'confirmPassword',
  ) => {
    let error = '';
    if (field === 'email') error = validateEmail(email);
    if (field === 'nickname') error = validateNickname(nickname);
    if (field === 'password') error = validatePassword(password);
    if (field === 'confirmPassword')
      error = validateConfirmPassword(confirmPassword);

    setErrors((prev) => ({ ...prev, [field]: error, general: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const nicknameError = validateNickname(nickname);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      email: emailError,
      nickname: nicknameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      general: '',
    });

    if (emailError || nicknameError || passwordError || confirmPasswordError) {
      return;
    }

    // 회원가입 요청에 필요한 데이터 전달
    useSignUp.mutate(
      { email, nickname, password, passwordConfirmation: confirmPassword },
      {
        onError: (error) => {
          let errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.';
          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          setErrors((prev) => ({ ...prev, general: errorMessage }));
        },
        onSuccess: () => {
          router.push('/');
        },
      },
    );
  };

  return (
    <div className="mt-[1.6rem] flex min-h-screen w-[34.3rem] flex-col items-center py-[3.2rem] text-text-primary tablet:w-[46rem]">
      <h1 className="mb-[4rem] mt-[4rem] text-2xl font-medium pc:text-4xl">
        회원가입
      </h1>
      <form onSubmit={handleSubmit} className="w-full space-y-[3.2rem]">
        <Input
          label="이름"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setErrors((prev) => ({ ...prev, nickname: '' }));
          }}
          placeholder="이름을 입력해주세요."
          onBlur={() => handleBlur('nickname')}
          error={!!errors.nickname}
          errorMessage={errors.nickname}
          className="w-full mobile:h-[4.4rem] tablet:h-[4.8rem] pc:h-[4.8rem]"
        />
        <EmailInput
          label="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: '' }));
          }}
          placeholder="이메일을 입력해주세요."
          onBlur={() => handleBlur('email')}
          error={!!errors.email}
          errorMessage={errors.email}
          className="w-full mobile:h-[4.4rem] tablet:h-[4.8rem] pc:h-[4.8rem]"
        />
        <PasswordInput
          label="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: '' }));
          }}
          placeholder="비밀번호를 입력해주세요."
          onBlur={() => handleBlur('password')}
          error={!!errors.password}
          errorMessage={errors.password}
          className="w-full mobile:h-[4.4rem] tablet:h-[4.8rem] pc:h-[4.8rem]"
        />
        <PasswordInput
          label="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirmPassword: '' }));
          }}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          onBlur={() => handleBlur('confirmPassword')}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          className="w-full mobile:h-[4.4rem] tablet:h-[4.8rem] pc:h-[4.8rem]"
        />
        <div>
          <Button
            size="large"
            className="h-[4.7rem] w-full text-[1.6rem] font-semibold text-text-inverse"
          >
            회원가입
          </Button>
          {errors.general && (
            <p className="mt-[1rem] text-[1.4rem] font-medium text-status-danger">
              {errors.general}
            </p>
          )}
        </div>
      </form>
      <div className="mt-[2rem] text-center">
        <SimpleLogin />
      </div>
    </div>
  );
};

export default SignUpForm;
