import { useModalStore } from '@/_store/modal-store';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background-primary bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-background-secondary rounded-[12px] w-[384px] h-auto flex items-center justify-center flex-col mx-auto text-center`}
      >
        {children}
      </div>
    </div>
  );
}
