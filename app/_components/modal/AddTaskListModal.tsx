'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input/Input';

interface AddTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskListModal({
  isOpen,
  onClose,
}: AddTaskListModalProps) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <Modal.CloseButton onClose={onClose} className="mr-[1.6rem]" />
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
        <div className="mb-[2.4rem] flex flex-col items-start">
          <span className="text-[1.6rem] font-medium leading-[1.9rem]">
            목록 이름
          </span>
          {/*추후 input 컴포넌트로 변경*/}
          <Input placeholder="목록 이름을 입력해주세요" className="w-[28rem]" />
        </div>

        <Button size="modal-medium" round="xl" className="mb-[3.2rem]">
          만들기
        </Button>
      </Modal>
    </div>
  );
}
