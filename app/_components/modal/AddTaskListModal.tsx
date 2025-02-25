'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { useState } from 'react';
import { createTaskList } from '@/_lib/api/tasklist-api';

interface AddTaskListModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  teamId: string;
}

export default function AddTaskListModal({
  isOpenModal,
  handleCloseModal,
  teamId,
}: AddTaskListModalProps) {
  const [taskListName, setTaskListName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskListName(e.target.value);
  };

  const handleCreate = async () => {
    try {
      await createTaskList(Number(teamId), {
        name: taskListName,
      });

      alert('목록이 생성되었습니다.');
      window.location.reload();
      handleCloseModal();
    } catch {
      alert('생성 실패');
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        className="px-[3rem]"
      >
        <Modal.CloseButton onClose={handleCloseModal} className="mr-[1.6rem]" />
        <div className="mb-[1.6rem] flex w-full flex-col gap-[0.8rem]">
          <Modal.Title
            title="새로운 목록 추가"
            className="mt-[4.8rem] flex flex-col"
          />
          <p className="text-[1.4rem] font-medium leading-[1.7rem] text-text-secondary">
            할 일에 대한 목록을 추가하고
            <br />
            목록별 할 일을 만들 수 있습니다.
          </p>
        </div>
        <div className="w-[28rem]">
          <div className="mb-[2.4rem] mt-[2rem] flex flex-col items-start gap-[0.8rem]">
            <span className="text-[1.6rem] font-medium leading-[1.9rem]">
              목록 이름
            </span>
            <input
              placeholder="목록 이름을 입력해주세요"
              onChange={handleInputChange}
              className="h-[4.8rem] w-full rounded-[1.2rem] border-[0.1rem] border-border-primary bg-background-secondary px-[1.6rem] text-[1.6rem] text-text-primary placeholder:text-text-default focus:border-brand-primary focus:outline-none"
            />
          </div>

          <Button
            size="modal-medium"
            round="xl"
            className="mb-[3.2rem]"
            onClick={handleCreate}
          >
            만들기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
