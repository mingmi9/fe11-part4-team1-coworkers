'use client';

import { useState } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input/Input';
export default function ChangePasswordModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div>
      <button onClick={handleOpenModal}>비밀번호 변경하기</button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="">
        <div className="mb-[1.6rem] flex flex-col gap-[0.8rem]">
          <Modal.Title
            title="비밀번호 변경하기"
            className="mt-[4.8rem] flex flex-col"
          />
        </div>
        <div className="mb-[1.6rem] flex flex-col items-start">
          <span className="text-[1.6rem] font-medium leading-[1.9rem]">
            새 비밀번호
          </span>
          <Input
            placeholder="새 비밀번호를 입력해주세요."
            className="w-[28rem]"
          />
        </div>
        <div className="mb-[2.4rem] flex flex-col items-start">
          <span className="text-[1.6rem] font-medium leading-[1.9rem]">
            새 비밀번호 확인
          </span>
          <Input
            placeholder="새 비밀번호를 다시 한 번 입력해주세요"
            className="w-[28rem]"
          />
        </div>
        <div className="mb-[3.2rem] flex flex-row gap-[0.8rem]">
          <Button
            size="modal-small"
            variant="outlined"
            onClick={handleCloseModal}
          >
            닫기
          </Button>
          <Button size="modal-small" variant="default">
            변경하기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
