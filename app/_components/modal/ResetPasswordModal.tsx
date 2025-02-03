'use client';

import { useState } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';

export default function ResetPasswordModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div>
      <button onClick={handleOpenModal}>비밀번호 재설정</button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="">
        <div className="mb-[1.6rem] flex flex-col gap-[0.8rem]">
          <Modal.Title
            title="비밀번호 재설정"
            subTitle="비밀번호 재설정 링크를 보내드립니다."
            className="mt-[4.8rem] flex flex-col"
          />
        </div>
        <div className="mb-[2.4rem] flex flex-col items-start gap-[0.8rem]">
          {/*추후 input 컴포넌트로 변경*/}
          <input
            placeholder="이메일을 입력하세요."
            className="h-[4.8rem] w-[28rem] rounded-[1.2rem] border-[0.1rem] border-border-primary bg-background-secondary p-[1.6rem] text-[1.6rem] font-normal leading-[1.9rem] text-text-primary placeholder:text-[1.6rem] placeholder:font-normal placeholder:leading-[1.9rem] placeholder:text-text-default"
          ></input>
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
