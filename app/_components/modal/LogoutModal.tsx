'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Modal } from '@/_components/common/Modal';
import Button from '@/_components/common/Button';
import AlertImg from '@icons/alert.svg';
import { useAuthStore } from '@/_store/auth-store';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const router = useRouter();
  const { clearAuthData } = useAuthStore();

  const handleLogout = () => {
    clearAuthData();
    onClose();
    router.push('/');
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-6">
      <div className="mt-[4rem] flex flex-col items-center justify-center gap-[1.6rem]">
        <Image src={AlertImg} alt="경고 아이콘" width={24} height={24} />
        <div className="mb-[2.4rem]">
          <Modal.Title
            title="로그아웃 하시겠어요?"
            className="mb-[0.8rem] flex flex-col"
          />
          <p className="text-[1.4rem] font-medium leading-[1.7rem] text-text-secondary">
            로그아웃 시 다시 로그인해야 합니다.
          </p>
        </div>
      </div>
      <div className="mb-[3.2rem] flex flex-row gap-[0.8rem]">
        <Button
          size="modal-small"
          variant="outlined_secondary"
          onClick={onClose}
        >
          닫기
        </Button>
        <Button size="modal-small" variant="danger" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
