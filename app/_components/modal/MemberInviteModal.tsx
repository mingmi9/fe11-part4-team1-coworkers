'use client';

import { Modal } from '../common/Modal';
import Button from '../common/Button';
import { createGroupInvitation } from '@/_lib/api/group-api';

interface MemberInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

export default function MemberInviteModal({
  isOpen,
  onClose,
  teamId,
}: MemberInviteModalProps) {
  const handleInvite = async () => {
    try {
      const token = await createGroupInvitation(Number(teamId));
      const INVITE_LINK = `http://www.coworkers.com/invite/${token}`;
      navigator.clipboard.writeText(INVITE_LINK);
      alert('링크가 복사되었습니다.');
      onClose();
    } catch {
      alert('에러 발생');
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className="">
        <Modal.CloseButton onClose={onClose} className="mr-[1.6rem]" />

        <Modal.Title
          title="멤버 초대"
          subTitle="그룹에 참여할 수 있는 링크를 복사합니다."
          className="mb-[4rem] mt-[4.8rem] flex flex-col"
        />

        <Button
          size="modal-medium"
          round="xl"
          className="mb-[3.2rem]"
          onClick={handleInvite}
        >
          링크 복사하기
        </Button>
      </Modal>
    </div>
  );
}
