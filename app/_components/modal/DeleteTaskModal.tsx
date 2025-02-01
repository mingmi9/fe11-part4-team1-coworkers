'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import AlertImg from '@icons/alert.svg';
import Image from 'next/image';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: string;
}

export default function DeleteTaskModal({
  isOpen,
  onClose,
  task,
}: DeleteTaskModalProps) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <div className="mt-[4rem] flex flex-col items-center justify-center gap-[1.6rem]">
          <Image src={AlertImg} alt="경고 아이콘" width={24} height={24} />
          <div className="mb-[2.4rem]">
            <Modal.Title title={`'${task}'`} className="flex flex-col" />
            <p className="mb-[0.8rem]">할 일을 정말 삭제하시겠어요?</p>
            <p className="text-[1.4rem] font-medium leading-[1.7rem] text-text-secondary">
              삭제 후에는 되돌릴 수 없습니다.
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
          <Button size="modal-small" variant="danger">
            삭제하기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
