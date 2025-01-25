import defaultImg from '@icons/member.svg';
import kebab from '@icons/kebab-small-button.svg';
import Image from 'next/image';

interface MemberCardProps {
  profileImg?: string;
  name: string;
  email: string;
}

export default function MemberCard({
  profileImg,
  name,
  email,
}: MemberCardProps) {
  return (
    <div className="flex h-[7.3rem] items-center justify-between break-all rounded-2xl bg-background-secondary px-[2.4rem] py-[2rem] mobile:h-[6.8rem] mobile:w-[16.35rem] tablet:w-[22.1rem] pc:w-[38.9rem]">
      <div className="flex items-center gap-[1rem]">
        <div className="h-[3.2rem] w-[3.2rem] overflow-hidden rounded-full">
          <Image
            src={profileImg || defaultImg}
            width={32}
            height={32}
            alt="유저 프로필"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[1.4rem] text-text-primary">{name}</div>
          <div className="text-[1.2rem] text-text-secondary">{email}</div>
        </div>
      </div>
      <button className="h-[1.6rem] w-[1.6rem] flex-shrink-0">
        <Image
          src={kebab}
          width={16}
          height={16}
          alt="케밥"
          className="hover:brightness-150"
        />
      </button>{' '}
      {/*모달 추후 작업*/}
    </div>
  );
}
