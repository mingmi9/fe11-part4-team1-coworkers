import React, { useState } from 'react';
import Input from './Input';
import Image from 'next/image';

interface PasswordInputProps {
  value: string; // 입력값 (비밀번호)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력값 변경 시 호출되는 함수
  placeholder?: string; // 입력 필드에 표시되는 플레이스홀더 텍스트
  id?: string; // 입력 필드의 ID
  error?: boolean; // 에러 발생 여부
  errorMessage?: string; // 에러 메시지 (옵션)
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  id,
  error,
  errorMessage,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <Input
        label="비밀번호"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        type={isPasswordVisible ? 'text' : 'password'}
        error={error}
        rightIcon={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex h-[2.4rem] w-[2.4rem] items-center justify-center"
            aria-label={
              isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보이기'
            }
          >
            <Image
              src={
                isPasswordVisible
                  ? '/icons/visibility_off.svg'
                  : '/icons/visibility_on.svg'
              }
              alt={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보이기'}
              width={20}
              height={20}
              className="pointer-events-none"
            />
          </button>
        }
      />
      {/* 에러 메시지 표시 */}
      {error && errorMessage && (
        <p className="mt-[1.6rem] text-[1.4rem] text-status-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
