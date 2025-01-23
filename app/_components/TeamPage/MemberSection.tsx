import MemberCard from "./MemberCard";

interface MemberSectionProps {
    member: {
        profileImg: string;
        name: string;
        email: string;
    }[],
    isAdmin: boolean;

}

export default function MemberSection({member, isAdmin}:MemberSectionProps) {
    return (
        <div className="text-text-primary text-[1.6rem] pc:w-[120rem] tablet:[69.6rem] mobile:[34.3rem]">
            <div className="flex justify-between mb-[2.4rem]">
                <div>
                    멤버 <span className="text-text-default">({member.length}명)</span>
                </div>
                {isAdmin && <button className="text-brand-primary hover:brightness-150">
                    + 새로운 멤버 초대하기
                </button>}
            </div>
            <div className="flex flex-wrap gap-[2.4rem]">
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
    )
}