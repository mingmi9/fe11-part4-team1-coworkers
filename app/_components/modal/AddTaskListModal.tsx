'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input/Input';
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
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="">
        <Modal.CloseButton onClose={handleCloseModal} className="mr-[1.6rem]" />
        <div className="mb-[1.6rem] flex flex-col gap-[0.8rem]">
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
        <div className="mb-[2.4rem] mt-[2rem] flex flex-col items-start">
          <span className="text-[1.6rem] font-medium leading-[1.9rem]">
            목록 이름
          </span>
          <Input
            className="h-[4rem] w-full"
            placeholder="목록 이름을 입력해주세요"
            onChange={handleInputChange}
          />
        </div>

        <Button
          size="modal-medium"
          round="xl"
          className="mb-[3.2rem] w-[24.4rem]"
          onClick={handleCreate}
        >
          만들기
        </Button>
      </Modal>
    </div>
  );
}
