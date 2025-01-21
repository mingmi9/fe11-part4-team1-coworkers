import Link from 'next/link';
import Image from 'next/image';
import TeamSelector from '@/_components/layout/Header/TeamSelector';
import UserAccount from '@/_components/layout/Header/UserAccount';
import GnbButton from '@/_components/layout/Header/GnbButton';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 w-full h-[6rem] bg-background-secondary flex items-center justify-between px-[1.6rem] tablet:px-[3.2rem] pc:px-[16vw]">
      <div className="flex items-center justify-between">
        <div className="tablet:hidden mr-[1.6rem]">
          <GnbButton />
        </div>
        <Link href="/" aria-label="홈으로 이동">
          <Image
            src="/icons/logo.svg"
            alt="Coworkers 로고"
            width={158}
            height={32}
            sizes="15.8rem"
            priority
            className="cursor-pointer tablet:mr-[3.2rem]"
          />
        </Link>
        <nav 
          className="items-center justify-center tablet:gap-[3.2rem] text-text-primary text-[1.6rem] font-medium hidden tablet:flex"
          aria-label="메인 네비게이션"
        >
          <TeamSelector />
          <Link href="/board">
            <span>자유 게시판</span>
          </Link>
        </nav>
      </div>

      <UserAccount />  
    </header>
  );
};

export default Header;
