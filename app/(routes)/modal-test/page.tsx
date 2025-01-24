'use client';

import { Modal } from '@/_components/common/Modal';
import { useState } from 'react';
import Button from '@/_components/common/Button';

export default function ModalTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <h1>모달 테스트 페이지</h1>
      <div>
        <button onClick={handleOpen}>멤버 초대</button>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <Modal.CloseButton onClose={handleClose} />

          <Modal.Title
            title="멤버 초대"
            subTitle="그룹에 참여할 수 있는 링크를 복사합니다."
            className="mb-[4rem] mt-[4.8rem] flex flex-col"
          />
          <Button size="modal" round="xl" className="mb-[3.2rem]">
            링크 복사하기
          </Button>
        </Modal>
      </div>
    </div>
  );
}
