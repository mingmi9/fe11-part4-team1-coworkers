import Image from 'next/image';
import XButton from '@icons/x.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
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
        className={`mx-auto flex h-auto w-[384px] flex-col items-center justify-center rounded-[12px] bg-background-secondary text-center`}
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
  <div className={`relative left-[15.6rem] top-[1.6rem]`}>
    <button onClick={onClose} className="absolute h-[2.4rem] w-[2.4rem]">
      <Image src={XButton} alt="모달 닫기 버튼" layout="fill" />
    </button>
  </div>
);

Modal.Title = Title;
Modal.CloseButton = CloseButton;
