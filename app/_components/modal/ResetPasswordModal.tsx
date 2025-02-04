'use client';

import { useState } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input/Input';

export default function ResetPasswordModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div>
      <button onClick={handleOpenModal}>비밀번호 재설정</button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="">
        <div className="mb-[0.8rem] flex flex-col">
          <Modal.Title
            title="비밀번호 재설정"
            subTitle="비밀번호 재설정 링크를 보내드립니다."
            className="mt-[4.8rem] flex flex-col"
          />
        </div>
        <div className="mb-[2.4rem] flex flex-col items-start">
          <Input placeholder="이메일을 입력하세요." className="w-[28rem]" />
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
            링크 보내기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
