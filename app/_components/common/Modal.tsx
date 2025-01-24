import Image from 'next/image';
import XButton from '@icons/x.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background-primary bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className={`mx-auto flex h-auto flex-col items-center justify-center bg-background-secondary text-center mobile:absolute mobile:bottom-0 mobile:w-full mobile:rounded-[1.2rem_1.2rem_0_0] tablet:relative tablet:w-[38.4rem] tablet:rounded-[1.2rem] pc:relative pc:w-[384px] pc:rounded-[1.2rem] ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

interface TitleProps {
  title: string;
  subTitle?: string;
  className?: string;
}

const Title = ({ title, subTitle, className }: TitleProps) => (
  <div className={`${className}`}>
    <div className="flex flex-col gap-[0.8rem]">
      <h2 className="text-[1.6rem] font-medium leading-[1.9rem] text-text-primary">
        {title}
      </h2>
      {subTitle && (
        <p className="text-[1.4rem] leading-[1.7rem] text-text-secondary">
          {subTitle}
        </p>
      )}
    </div>
  </div>
);

const CloseButton = ({ onClose }: { onClose: () => void }) => (
  <div className="relative top-[1.6rem] flex mobile:w-full tablet:w-[38.4rem] pc:w-[38.4rem]">
    <button
      onClick={onClose}
      className="absolute mobile:right-0 tablet:right-[1.6rem] pc:right-[1.6rem]"
    >
      <Image src={XButton} alt="모달 닫기 버튼" width={24} height={24} />
    </button>
  </div>
);

Modal.Title = Title;
Modal.CloseButton = CloseButton;
