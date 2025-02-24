'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import AlertImg from '@icons/alert.svg';
import Image from 'next/image';
import { deleteTaskList } from '@/_lib/api/tasklist-api';

interface DeleteTaskModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  taskName: string;
  teamId: string;
  taskId: number;
}

export default function DeleteTaskModal({
  isOpenModal,
  handleCloseModal,
  taskName,
  taskId,
  teamId,
}: DeleteTaskModalProps) {
  const handleDelete = async () => {
    try {
      await deleteTaskList(Number(teamId), taskId);

      alert('삭제 완료');
      window.location.reload();
      handleCloseModal();
    } catch {
      alert('삭제 실패');
    }
  };
  return (
    <div>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="">
        <div className="mt-[4rem] flex flex-col items-center justify-center gap-[1.6rem]">
          <Image src={AlertImg} alt="경고 아이콘" width={24} height={24} />
          <div className="mb-[2.4rem]">
            <Modal.Title title={`'${taskName}'`} className="flex flex-col" />
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
            onClick={handleCloseModal}
          >
            닫기
          </Button>
          <Button size="modal-small" variant="danger" onClick={handleDelete}>
            삭제하기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
