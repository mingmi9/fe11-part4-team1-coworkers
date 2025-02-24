'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '@/_components/common/Dropdown';
import LogoutModal from '@/_components/modal/LogoutModal';
import { UserDataProps } from '.';

interface UserAccountProps {
  isLoggedIn: boolean;
  userData: UserDataProps | null;
}

const UserAccount = ({ isLoggedIn, userData }: UserAccountProps) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="flex items-center rounded-xl px-4 py-2 text-text-primary transition-colors hover:bg-gray-50/10"
      >
        로그인
      </Link>
    );
  }

  return (
    <div aria-label="사용자 메뉴">
      <Dropdown>
        {({ isOpen, toggleDropdown }) => (
          <>
            <Dropdown.Button
              onClick={toggleDropdown}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className="flex items-center rounded-xl p-1 transition-colors hover:bg-gray-50/10"
            >
              <div className="flex items-center gap-2">
                <div className="relative size-[2.4rem] pc:size-[1.6rem]">
                  <Image
                    src={userData?.image || '/icons/user.svg'}
                    alt={userData?.nickname || '사용자 이미지'}
                    fill
                    sizes="2.4rem"
                    className="rounded-full object-contain"
                  />
                </div>

                <div className="hidden text-sm text-text-primary pc:block">
                  {userData?.nickname}
                </div>
              </div>
            </Dropdown.Button>
            <Dropdown.Menu
              isOpen={isOpen}
              boxClass="w-[12rem] top-[5rem] right-0 flex flex-col gap-2 text-text-primary text-[1.4rem] shadow-2xl"
            >
              <Link href="/myhistory" className="w-full">
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  className="justify-center rounded-xl"
                >
                  마이 히스토리
                </Dropdown.Item>
              </Link>
              <Link href="/mypage" className="w-full">
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  className="justify-center rounded-xl"
                >
                  계정 설정
                </Dropdown.Item>
              </Link>
              <Dropdown.Item
                toggleDropdown={toggleDropdown}
                className="justify-center rounded-xl"
                onClick={() => setIsLogoutOpen(true)}
              >
                로그아웃
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </div>
  );
};

export default UserAccount;
