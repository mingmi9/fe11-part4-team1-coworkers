'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import AlertImg from '@icons/alert.svg';
import Image from 'next/image';

interface KickUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  name,
}: KickUserModalProps) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <div className="mt-[4rem] flex flex-col items-center justify-center gap-[1.6rem]">
          <Image src={AlertImg} alt="경고 아이콘" width={24} height={24} />
          <div className="mb-[2.4rem]">
            <Modal.Title
              title={`정말 '${name}' 님을 팀에서 추방하시겠습니까?`}
              className="mb-[0.8rem] flex flex-col"
            />
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
          <Button size="modal-small" variant="danger">
            추방하기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
