'use client';

import React, { useState, useEffect } from 'react';
import EmailInput from '@/_components/common/Input/EmailInput';
import PasswordInput from '@/_components/common/Input/PasswordInput';
import Button from '@/_components/common/Button';
import Link from 'next/link';
import { signIn } from '@/_lib/api/auth-api';
import { useAuthStore } from '@/_store/auth-store';
import { useRouter } from 'next/navigation';
import SimpleLogin from './SimpleLogin';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { setAuthData, isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return '이메일은 필수 입력입니다.';
    if (!emailPattern.test(email)) return '이메일 형식으로 작성해 주세요.';
    return undefined;
  };

  const validatePassword = (password: string) => {
    if (!password) return '비밀번호는 필수 입력입니다.';
    if (password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
    return undefined;
  };

  const handleBlur = (field: 'email' | 'password') => {
    if (field === 'email') {
      setEmailError(validateEmail(email));
    } else if (field === 'password') {
      setPasswordError(validatePassword(password));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError || passwordValidationError) {
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      return;
    }

    try {
      setIsLoading(true);

      const response = await signIn({ email, password });

      setAuthData({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: response.user,
      });

      router.push('/');
    } catch (error: unknown) {
      console.error('로그인 실패:', error);

      if (error instanceof Error && error.message) {
        setFormError(error.message);
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const responseError = error as { response?: { data?: { message?: string } } };
        setFormError(responseError.response?.data?.message || '이메일 혹은 비밀번호를 확인해주세요.');
      } else {
        setFormError('이메일 혹은 비밀번호를 확인해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full tablet:max-w-[46rem]  text-text-primary py-8">
      <h1 className="text-2xl pc:text-4xl font-medium mb-6">로그인</h1>
      <form onSubmit={handleSubmit} className="w-full p-8 flex flex-col gap-4">
        <EmailInput
          label="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(undefined);
          }}
          placeholder="이메일을 입력해주세요."
          onBlur={() => handleBlur('email')}
          error={!!emailError}
          errorMessage={emailError}
          className="h-[4.4rem] tablet:h-[4.8rem]"
        />
        <PasswordInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError(undefined);
          }}
          placeholder="비밀번호를 입력해주세요."
          onBlur={() => handleBlur('password')}
          error={!!passwordError}
          errorMessage={passwordError}
          className="h-[4.4rem] tablet:h-[4.8rem]"
        />
        {formError && <p className="text-status-danger font-medium text-[1.4rem]">{formError}</p>}
        <div className="text-right font-medium text-[1.4rem] tablet:text-[1.6rem] text-brand-primary">
          <Link href="/forgot-password" className="hover:underline">비밀번호를 잊으셨나요?</Link>
        </div>
        <Button
          size="large"
          variant="default"
          icon="none"
          round="xl"
          className={`mt-[3rem] w-full h-[4.7rem] font-semibold text-[1.6rem] hover:bg-brand-primary text-text-inverse  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <div className="mt-2 text-[1.4rem] tablet:text-[1.6rem] font-medium text-text-primary">
        아직 계정이 없으신가요?{' '}
        <Link href="/signUp" className="ml-4 text-brand-primary hover:underline">가입하기</Link>
      </div>
      <div className="mt-6 ">
      <SimpleLogin/>
      </div>
    </div>
  );
};

export default LoginForm;
