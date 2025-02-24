import React, { InputHTMLAttributes, useId, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  isAllowSpace?: boolean;
  rightIcon?: React.ReactNode;
  onValidate?: (value: string) => string | undefined; // 추가 유효성 검사 함수
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value: propValue = '',
  onChange,
  placeholder,
  id,
  type = 'text',
  error: externalError,
  errorMessage: externalErrorMessage,
  isAllowSpace = true,
  rightIcon,
  onValidate, // 추가 유효성 검사 함수
  className = '',
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const [inputValue, setInputValue] = useState<string>(String(propValue));
  const [internalError, setInternalError] = useState<string | undefined>(
    undefined,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (isAllowSpace && newValue.length > 1) {
      newValue = newValue.replace(/\s{2,}/g, ' '); // 공백 두 개 이상을 하나로 치환
    } else if (!isAllowSpace) {
      newValue = newValue.replace(/\s/g, ''); // 공백 제거
    }

    setInputValue(newValue);

    // 부모의 onChange 호출
    onChange?.({
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    });

    // 추가 유효성 검사 수행
    if (onValidate) {
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
    <div className="relative flex flex-col">
      <label htmlFor={inputId} className="mb-[0.8rem]">
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full rounded-[1.2rem] border-[0.1rem] bg-background-secondary px-[1.6rem] text-[1.6rem] text-text-primary placeholder:text-text-default focus:border-brand-primary focus:outline-none ${finalError ? 'border-status-danger focus:border-status-danger' : 'border-border-primary focus:border-interaction-hover'} ${rightIcon ? 'pr-[4.8rem]' : ''} ${className}`}
        />

        {/* 오른쪽 아이콘 */}
        {rightIcon && (
          <div className="absolute right-[1.6rem] top-1/2 -translate-y-1/2 transform">
            {rightIcon}
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {finalError && finalErrorMessage && (
        <span className="mt-[0.4rem] text-[1.4rem] text-status-danger">
          {finalErrorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;
