import defaultImg from "@icons/member.svg"
import kebab from "@icons/kebab-small-button.svg"
import Image from 'next/image';

interface MemberCardProps {
    profileImg?: string;
    name: string;
    email: string;
}

export default function MemberCard({profileImg, name,email}:MemberCardProps) {
    return(
        <div className="pc:w-[38.4rem] h-[7.3rem] tablet:w-[21.6rem] mobile:w-[16.35rem] mobile:h-[6.8rem] bg-background-secondary rounded-2xl py-[2rem] px-[2.4rem] flex justify-between items-center break-all">
            <div className="flex gap-[1rem] items-center">
                <div className="w-[3.2rem] h-[3.2rem] overflow-hidden rounded-full">
                    <Image src={profileImg || defaultImg} width={32} height={32} alt="유저 프로필"/>
                </div>
                <div className="flex flex-col">
                    <div className="text-text-primary text-[1.4rem]">
                        {name}
                    </div>
                    <div className="text-text-secondary text-[1.2rem] ">
                        {email}
                    </div>
                </div>
            </div>
            <button className="w-[1.6rem] h-[1.6rem] flex-shrink-0">
                <Image src={kebab} width={16} height={16} alt="케밥" className="hover:brightness-150"/>
            </button>
        </div>
    )
};