'use client';

import { useState } from 'react';
import { Modal } from '../common/Modal';
import Image from 'next/image';
import Button from '../common/Button';
import defaultImg from '@icons/member.svg';

export default function ProfileModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert('이메일이 복사되었습니다.');
    } catch (error) {
      console.error('이메일 복사에 실패했습니다.', error);
      alert('이메일 복사에 실패했습니다.');
    }
  };

  const profileImg = '';
  const name = '코드잇';
  const email = '1234@gamil.com';

  return (
    <div>
      <button onClick={handleOpenModal}>프로필 모달</button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal} type="profile">
        <Modal.CloseButton onClose={handleCloseModal} className="mr-[3.2rem]" />
        <div className="mb-[2.4rem] mt-[4.8rem] flex flex-col">
          <div className="relative mobile:h-[4.6rem] mobile:w-[4.6rem] tablet:h-[5.2rem] tablet:w-[5.2rem] pc:h-[5.2rem] pc:w-[5.2rem]">
            <Image
              src={profileImg || defaultImg}
              layout="fill"
              alt="유저 프로필"
            />
          </div>
        </div>
        <div className="mb-[2.4rem] flex flex-col gap-[0.8rem]">
          <span className="text-[1.4rem] font-medium leading-[1.7rem] text-text-primary">
            {name}
          </span>
          <p className="text-[1.2rem] font-normal leading-[1.4rem] text-text-secondary">
            {email}
          </p>
        </div>
        <Button
          onClick={handleCopyEmail}
          size="modal-medium"
          round="xl"
          className="mb-[3.2rem]"
        >
          이메일 복사하기
        </Button>
      </Modal>
    </div>
  );
}
