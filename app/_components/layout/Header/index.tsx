import Link from 'next/link';
import Image from 'next/image';
import TeamSelector from '@/_components/layout/Header/TeamSelector';
import UserAccount from '@/_components/layout/Header/UserAccount';
import GnbButton from '@/_components/layout/Header/GnbButton';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex h-[6rem] w-full items-center justify-between bg-background-secondary px-[1.6rem] tablet:px-[3.2rem] pc:px-[16vw]">
      <div className="flex items-center justify-between">
        <div className="mr-[1.6rem] tablet:hidden">
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
          className="hidden items-center justify-center text-[1.6rem] font-medium text-text-primary tablet:flex tablet:gap-[3.2rem]"
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
