import Image from 'next/image';
import DeleteBtn from '@icons/secession.svg';
import DeleteUserModal from '../modal/DeleteUserModal';

interface DeleteUserBtnProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteUserBtn({
  isOpen,
  onOpen,
  onClose,
  onDelete,
}: DeleteUserBtnProps) {
  return (
    <div>
      <button
        className="mt-[2.4rem] flex flex-row gap-[0.8rem]"
        onClick={onOpen}
      >
        <Image src={DeleteBtn} alt="회원 탈퇴 버튼" width={24} height={24} />
        <span className="text-[1.6rem] font-medium text-[#ef4444]">
          회원 탈퇴하기
        </span>
      </button>
      {isOpen && <DeleteUserModal onDelete={onDelete} onClose={onClose} />}
    </div>
  );
}
