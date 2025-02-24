'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import { updateTaskList } from '@/_lib/api/tasklist-api';

interface AddTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  teamId: string;
  taskId: number;
}

export default function AddTaskListModal({
  isOpen,
  onClose,
  name,
  teamId,
  taskId,
}: AddTaskListModalProps) {
  const [inputValue, setInputValue] = useState(name);

  useEffect(() => {
    setInputValue(name);
  }, [isOpen, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEdit = async () => {
    try {
      await updateTaskList(Number(teamId), taskId, { name: inputValue });

      alert('수정 성공');
      window.location.reload();
      onClose();
    } catch {
      alert('전송실패');
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <Modal.CloseButton onClose={onClose} className="mr-[1.6rem]" />
        <div className="mb-[1.6rem] flex flex-col gap-[0.8rem]">
          <Modal.Title
            title="할일 목록 수정"
            className="mt-[4.8rem] flex flex-col"
          />
        </div>
        <div className="mb-[2.4rem] flex flex-col items-start gap-[0.8rem]">
          <span className="text-[1.6rem] font-medium leading-[1.9rem]">
            수정할 목록 이름
          </span>
          {/*추후 input 컴포넌트로 변경*/}
          <input
            value={inputValue}
            onChange={handleChange}
            placeholder="목록 이름을 입력해주세요."
            className="h-[4.8rem] w-[28rem] rounded-[1.2rem] border-[0.1rem] border-border-primary bg-background-secondary p-[1.6rem] text-[1.6rem] font-normal leading-[1.9rem] text-text-primary placeholder:text-[1.6rem] placeholder:font-normal placeholder:leading-[1.9rem] placeholder:text-text-default"
          ></input>
        </div>

        <Button
          size="modal-medium"
          round="xl"
          className="mb-[3.2rem]"
          onClick={handleEdit}
        >
          수정하기
        </Button>
      </Modal>
    </div>
  );
}
