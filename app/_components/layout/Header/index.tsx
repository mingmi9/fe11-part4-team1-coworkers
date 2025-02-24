'use client';

import Link from 'next/link';
import Image from 'next/image';
import TeamSelector from '@/_components/layout/Header/TeamSelector';
import UserAccount from '@/_components/layout/Header/UserAccount';
import GnbButton from '@/_components/layout/Header/GnbButton';
import { useEffect, useState, useCallback } from 'react';
import { getUserInfo } from '@/_lib/api/user-api';
import { useAuthStore } from '@/_store/auth-store';

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
  const { isLoggedIn, accessToken } = useAuthStore();
  const [data, setData] = useState<UserDataProps | null>(null);

  const fetchUserData = useCallback(async () => {
    if (!accessToken) {
      setData(null);
      return;
    }

    try {
      const userData = await getUserInfo({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(userData);
    } catch (error) {
      console.error('로그인 정보를 가져오는데 실패했습니다', error);
      setData(null);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    } else {
      setData(null);
    }
  }, [isLoggedIn, fetchUserData]);

  return (

    <header className="sticky top-0 z-20 flex h-[6rem] w-full items-center bg-background-secondary">
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between px-[1.6rem] tablet:px-[3.2rem]">
        <div className="flex items-center justify-between text-[1.6rem] font-medium">
          <div className="mr-[1.6rem] tablet:hidden">
            <GnbButton />
          </div>
          <Link
            href="/"
            aria-label="홈으로 이동"
            className="tablet:mr-[3.2rem] pc:mr-[4rem]"
          >
            <div className="relative h-[2.4rem] w-[10.2rem] pc:h-[3.2rem] pc:w-[15.8rem]">
              <Image
                src="/icons/logo.svg"
                alt="Coworkers"
                fill
                sizes="15.8rem"
                priority
                className="object-contain"
              />
            </div>
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

