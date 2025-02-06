import React, { ComponentProps, useState } from 'react';
import Input from './Input';

interface EmailInputProps extends ComponentProps<typeof Input> {
  onValidate?: (value: string) => string | undefined; // 추가 유효성 검사 함수
  error?: boolean; // 외부에서 전달하는 에러 상태
  errorMessage?: string; // 외부에서 전달하는 에러 메시지
}

const EmailInput: React.FC<EmailInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  id,
  onValidate,
  error: externalError,
  errorMessage: externalErrorMessage,
}) => {
  const [internalError, setInternalError] = useState<string | undefined>(
    undefined,
  );

  // 기본 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(e);

    if (!validateEmail(newValue)) {
      setInternalError('이메일 형식으로 작성해 주세요.');
    } else if (onValidate) {
      const customError = onValidate(newValue);
      setInternalError(customError ?? undefined);
    } else {
      setInternalError(undefined);
    }
  };

  // 최종 에러 상태 (내부 에러 vs 외부에서 전달된 에러)
  const finalError = externalError ?? !!internalError;
  const finalErrorMessage = externalErrorMessage ?? internalError;

  return (
    <div className="mb-[1.6rem] flex flex-col">
      <Input
        label={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        id={id}
        error={finalError}
        errorMessage={finalErrorMessage}
        isAllowSpace={false}
      />
    </div>
  );
};

export default EmailInput;
