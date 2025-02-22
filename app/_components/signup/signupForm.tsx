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
    const passwordPattern = /^[A-Za-z0-9!@#$%^&*]+$/;
    if (!passwordPattern.test(value)) return '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
    return '';
  };

  const validateConfirmPassword = (value: string): string => {
    if (!value) return '비밀번호 확인을 입력해주세요.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleBlur = (field: 'email' | 'nickname' | 'password' | 'confirmPassword') => {
    let error = '';
    if (field === 'email') error = validateEmail(email);
    if (field === 'nickname') error = validateNickname(nickname);
    if (field === 'password') error = validatePassword(password);
    if (field === 'confirmPassword') error = validateConfirmPassword(confirmPassword);

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const nicknameError = validateNickname(nickname);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (emailError || nicknameError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        nickname: nicknameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        general: '',
      });
      return;
    }

    // 회원가입 요청에 필요한 데이터 전달
    useSignUp.mutate(
      { email, nickname, password, passwordConfirmation: confirmPassword },
      {
        onError: (error) => {
          let errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          setErrors((prev) => ({ ...prev, general: errorMessage }));
        },
        onSuccess: () => {
          router.push('/');
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-[34.3rem] tablet:w-[46rem] items-center mt-4 min-h-screen text-text-primary py-8 ">
      <h1 className="text-2xl font-medium pc:text-4xl mt-[4rem] mb-10">회원가입</h1>
      <form onSubmit={handleSubmit} className="w-full space-y-8">
      <Input
          label="이름"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="이름을 입력해주세요."
          onBlur={() => handleBlur('nickname')}
          error={!!errors.nickname}
          errorMessage={errors.nickname}
          className=" h-[4.4rem] tablet:h-[4.8rem]"

        />
        <EmailInput
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요."
          onBlur={() => handleBlur('email')}
          error={!!errors.email}
          errorMessage={errors.email}
          className="h-[4.4rem] tablet:h-[4.8rem]"
        />
        
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
          onBlur={() => handleBlur('password')}
          error={!!errors.password}
          errorMessage={errors.password}
          className="h-[4.4rem] tablet:h-[4.8rem]"
        />
        <PasswordInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          onBlur={() => handleBlur('confirmPassword')}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          className="h-[4.4rem] tablet:h-[4.8rem]"
        />
        {errors.general && <p className="text-status-danger text-[1.4rem] font-medium">{errors.general}</p>}
        </form>
        <div className="mt-[3rem] tablet:mt-[4rem] w-full">
        <Button size="large" className="w-full h-[4.7rem] bg-brand-primary  text-text-inverse font-semibold text-[1.6rem]">
          회원가입
        </Button>
        </div>
      
      <div className="mt-5 text-center">
        <SimpleLogin />
      </div>
    </div>
  );
};

export default SignUpForm;







