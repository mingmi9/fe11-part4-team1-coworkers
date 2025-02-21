import Image from 'next/image';
import { forwardRef, Ref } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  errorMessage?: string;
  required?: boolean;
  type?: 'text' | 'textarea' | 'file';
  previewImage?: string | null;
  onRemoveImage?: () => void;
  onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const commonInputClass =
  'rounded-[1.2rem] border border-background-tertiary bg-background-secondary text-sm placeholder-[#9CA3AF] focus:border-brand-primary focus:outline-none tablet:text-base';

const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(
  (
    {
      label,
      value,
      onInputChange,
      errorMessage,
      required,
      type = 'text',
      previewImage,
      onRemoveImage,
      onImageUpload,
    },
    ref,
  ) => {
    const borderColor = errorMessage
      ? 'border-status-danger focus:border-status-danger'
      : 'border-background-tertiary';
    return (
      <div>
        {/* 제목 */}
        <div className="text-sm font-medium tablet:text-base">
          {required && (
            <span className="mr-[.6rem] text-brand-tertiary">*</span>
          )}
          <span>{label}</span>
        </div>

        {/* 인풋 */}
        <div className="mb-[3.2rem] mt-[1.6rem]">
          {type === 'text' ? (
            <input
              ref={ref as Ref<HTMLInputElement>}
              type="text"
              placeholder={`${label}을 입력해주세요.`}
              className={`${borderColor} ${commonInputClass} h-[4.8rem] w-full p-[1.6rem] tablet:px-[2.4rem]`}
              value={value}
              onChange={onInputChange}
            />
          ) : type === 'file' ? (
            <div
              className={`${commonInputClass} size-[16rem] overflow-hidden tablet:size-[24rem]`}
            >
              {previewImage ? (
                <div className="relative size-full">
                  <Image
                    src={previewImage}
                    alt="미리보기 이미지"
                    fill
                    sizes="7.2rem"
                    className="object-cover"
                  />

                  <button
                    className="absolute right-0 top-0 bg-black bg-opacity-50 p-1"
                    onClick={onRemoveImage}
                  >
                    <div className="relative size-[3.2rem] tablet:size-[4rem]">
                      <Image
                        src="/icons/ic-delete.svg"
                        alt="이미지 삭제"
                        fill
                        sizes="4rem"
                        className="object-contain"
                      />
                    </div>
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="imageUpload"
                  className="flex size-full cursor-pointer flex-col items-center justify-center gap-[1.2rem]"
                >
                  <div className="relative size-[2.4rem] tablet:size-[4.8rem]">
                    <Image
                      src="/icons/ic-plus-gray.svg"
                      alt="등록"
                      fill
                      sizes="4.8rem"
                      className="object-contain"
                    />
                  </div>
                  <div className="text-sm text-[#9CA3AF] tablet:text-base">
                    이미지 등록
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={onImageUpload}
                  />
                </label>
              )}
            </div>
          ) : (
            <textarea
              ref={ref as Ref<HTMLTextAreaElement>}
              placeholder={`${label}을 입력해주세요.`}
              className={`${borderColor} ${commonInputClass} h-[24rem] w-full px-[1.6rem] py-[.8rem] tablet:px-[2.4rem] tablet:py-[1.6rem]`}
              value={value}
              onChange={onInputChange}
            />
          )}

          {/* 에러 메세지 */}
          {errorMessage && (
            <p className="mt-[0.4rem] text-sm text-status-danger">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  },
);
InputField.displayName = 'InputField';
export default InputField;
