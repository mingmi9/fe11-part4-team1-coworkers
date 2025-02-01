'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';

interface MemberInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberInviteModal({
  isOpen,
  onClose,
}: MemberInviteModalProps) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <Modal.CloseButton onClose={onClose} className="mr-[1.6rem]" />

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
