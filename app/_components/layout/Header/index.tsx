'use client';

import Link from 'next/link';
import Image from 'next/image';
import TeamSelector from '@/_components/layout/Header/TeamSelector';
import UserAccount from '@/_components/layout/Header/UserAccount';
import GnbButton from '@/_components/layout/Header/GnbButton';
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/_lib/api/user-api';

export interface UserDataProps {
  teamId: string;
  image: string;
  nickname: string;
  email: string;
  id: number;
  memberships: {
    group: {
      teamId: string;
      image: string;
      name: string;
      id: number;
    };
    role: string;
    userImage: string;
    userEmail: string;
    userName: string;
    groupId: number;
    userId: number;
  }[];
}

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState<UserDataProps | null>(null);

  const fetchUserData = async () => {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) {
      setIsLoggedIn(false);
      setData(null);
      return;
    }
    const parsedData = JSON.parse(authStorage);
    const accessToken = parsedData?.state?.accessToken;

    if (!accessToken) return;

    try {
      const data = await getUserInfo({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(data);
      setIsLoggedIn(true);
    } catch {
      console.log('로그인 정보를 가져오는데 실패했습니다');
      setIsLoggedIn(false);
      setData(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    } else {
      setData(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsedData = JSON.parse(authStorage);
      const accessToken = parsedData?.state?.accessToken;
      setIsLoggedIn(!!accessToken);
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-[6rem] w-full items-center bg-background-secondary">
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between px-[1.6rem] tablet:px-[3.2rem]">
        <div className="flex items-center justify-between text-[1.6rem] font-medium">
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
            className="hidden items-center justify-center text-text-primary tablet:flex tablet:gap-[3.2rem]"
            aria-label="메인 네비게이션"
          >
            <TeamSelector isLoggedIn={isLoggedIn} userData={data ?? null} />
            <Link href="/articles">
              <span>자유 게시판</span>
            </Link>
          </nav>
        </div>

        <UserAccount isLoggedIn={isLoggedIn} userData={data ?? null} />
      </div>
    </header>
  );
};

export default Header;
