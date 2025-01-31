'use client';

import { useState } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';

export default function MemberInviteModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div>
      <button onClick={handleOpenModal}>멤버 초대하기 </button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} className="">
        <Modal.CloseButton onClose={handleCloseModal} className="mr-[1.6rem]" />

        <Modal.Title
          title="멤버 초대"
          subTitle="그룹에 참여할 수 있는 링크를 복사합니다."
          className="mb-[4rem] mt-[4.8rem] flex flex-col"
        />

        <Button size="modal-medium" round="xl" className="mb-[3.2rem]">
          링크 복사하기
        </Button>
      </Modal>
    </div>
  );
}
