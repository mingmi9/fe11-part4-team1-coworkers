'use client';

import { useState } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import AlertImg from '@icons/alert.svg';
import Image from 'next/image';

export default function DeleteUserModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div>
      <button onClick={handleOpenModal}>회원 탈퇴하기</button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="">
        <div className="mt-[4rem] flex flex-col items-center justify-center gap-[1.6rem]">
          <Image src={AlertImg} alt="경고 아이콘" width={24} height={24} />
          <div className="mb-[2.4rem]">
            <Modal.Title
              title="회원 탈퇴를 진행하시겠어요?"
              className="mb-[0.8rem] flex flex-col"
            />
            <p className="text-[1.4rem] font-medium leading-[1.7rem] text-text-secondary">
              그룹장으로 있는 그룹은 자동으로 삭제되고,
              <br />
              모든 그룹에서 나가집니다.
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
          <Button size="modal-small" variant="danger">
            회원 탈퇴
          </Button>
        </div>
      </Modal>
    </div>
  );
}
