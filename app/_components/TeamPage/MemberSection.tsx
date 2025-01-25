import MemberCard from './MemberCard';

interface MemberSectionProps {
  member: {
    profileImg: string;
    name: string;
    email: string;
  }[];
  isAdmin: boolean;
}

export default function MemberSection({ member, isAdmin }: MemberSectionProps) {
  return (
    <div className="tablet:[69.6rem] mobile:[34.3rem] text-[1.6rem] text-text-primary pc:w-[120rem]">
      <div className="mb-[2.4rem] flex justify-between">
        <div>
          멤버 <span className="text-text-default">({member.length}명)</span>
        </div>
        {isAdmin && (
          <button className="text-brand-primary hover:brightness-150">
            + 새로운 멤버 초대하기
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-[2.4rem] mobile:gap-[1.6rem]">
        {member.map((member, index) => (
          <MemberCard
            key={index}
            profileImg={member.profileImg}
            name={member.name}
            email={member.email}
          />
        ))}
      </div>
    </div>
  );
}
