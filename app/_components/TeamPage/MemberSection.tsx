import { useState } from 'react';
import MemberCard from './MemberCard';
import MemberInviteModal from '../modal/MemberInviteModal';

interface MemberSectionProps {
  members: {
    userImage: string;
    userName: string;
    userEmail: string;
    userId: number;
  }[];
  isAdmin: boolean;
  teamId: string;
}

export default function MemberSection({
  members,
  isAdmin,
  teamId,
}: MemberSectionProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleInviteMember = () => {
    setIsOpenModal(true);
  };

  return (
    <div className="mobile:[34.3rem] text-[1.6rem] text-text-primary tablet:w-full pc:w-[120rem]">
      <div className="mb-[2.4rem] flex justify-between">
        <div>
          멤버 <span className="text-text-default">({members.length}명)</span>
        </div>
        {isAdmin && (
          <div>
            <button
              className="text-brand-primary hover:brightness-150"
              onClick={handleInviteMember}
            >
              + 새로운 멤버 초대하기
            </button>
            <MemberInviteModal
              isOpen={isOpenModal}
              onClose={() => setIsOpenModal(false)}
              teamId={teamId}
            />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-[2.4rem] mobile:gap-[1.6rem]">
        {members.map((members, index) => (
          <MemberCard
            key={index}
            profileImg={members.userImage}
            name={members.userName}
            email={members.userEmail}
            id={members.userId}
            isAdmin={isAdmin}
            teamId={teamId}
          />
        ))}
      </div>
    </div>
  );
}
