'use client';

import Modal from '@/_components/common/Modal';
import { useModalStore } from '@/_store/modal-store';
import Image from 'next/image';
import XButton from '@icons/x.svg';

export default function ModalTestPage() {
  const { openModal, closeModal } = useModalStore();

  return (
    <div>
      <h1>모달 테스트 페이지</h1>
      <div>
        <button onClick={openModal}>멤버 초대</button>
        <Modal>
          <div className="flex flex-col relative">
            <button className="absolute w-[24px] h-[24px] top-[16px] left-[344px]">
              <Image
                src={XButton}
                alt="모달 닫기 버튼"
                layout="fill"
                onClick={closeModal}
              />
            </button>
            <div className="flex flex-col gap-[40px] m-[48px_52px_32px]">
              <div className="w-[280px] flex flex-col gap-[8px]">
                <h2 className="font-medium text-[16px] leading-[19px] text-text-primary">
                  멤버 초대
                </h2>
                <p className="font-medium text-[14px] leading-[17px] text-text-secondary">
                  그룹에 참여할 수 있는 링크를 복사합니다.
                </p>
              </div>
              <button className="w-[280px] bg-brand-primary rounded-[12px] h-[47px] font-semibold text-[16px] leading-[19px] text-white">
                링크 복사하기
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
