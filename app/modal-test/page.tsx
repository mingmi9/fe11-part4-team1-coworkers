'use client';

import Modal from '@/_components/common/Modal';
import { useModalStore } from '@/_store/modal-store';
import Image from 'next/image';
import XButton from '@icons/x.svg';
import Button from '@/_components/Button';

export default function ModalTestPage() {
  const { openModal, closeModal } = useModalStore();

  return (
    <div>
      <h1>모달 테스트 페이지</h1>
      <div>
        <button onClick={openModal}>멤버 초대</button>
        <Modal>
          <div className="relative flex flex-col">
            <button className="absolute left-[34.4rem] top-[1.6rem] h-[2.4rem] w-[2.4rem]">
              <Image
                src={XButton}
                alt="모달 닫기 버튼"
                layout="fill"
                onClick={closeModal}
              />
            </button>
            <div className="m-[4.8rem_5.2rem_3.2rem] flex flex-col gap-[4rem]">
              <div className="flex w-[28rem] flex-col gap-[0.8rem]">
                <h2 className="text-[1.6rem] font-medium leading-[1.9rem] text-text-primary">
                  멤버 초대
                </h2>
                <p className="text-[1.4rem] font-medium leading-[1.7rem] text-text-secondary">
                  그룹에 참여할 수 있는 링크를 복사합니다.
                </p>
              </div>
              <Button
                size="medium"
                className="h-[4.7rem] rounded-[1.2rem] text-[1.6rem] font-semibold leading-[1.9rem]"
              >
                버튼 한 개인 모달
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
