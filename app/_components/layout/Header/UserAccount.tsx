'use client';

import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '@/_components/common/Dropdown';
import { UserDataProps } from '.';

interface UserAccountProps {
  isLoggedIn: boolean;
  userData: UserDataProps | null;
}

const UserAccount = ({ isLoggedIn, userData }: UserAccountProps) => {
  if (!isLoggedIn) {
    return (
      <Link
        href="Login"
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
                <Image
                  src={userData?.image || '/icons/user.svg'}
                  alt={userData?.nickname || '사용자 이미지'}
                  width={32}
                  height={32}
                  sizes="3.2rem"
                  className="size-[3.2rem] rounded-full object-cover"
                />
                <span className="hidden text-text-primary tablet:inline">
                  {userData?.nickname}
                </span>
              </div>
            </Dropdown.Button>
            <Dropdown.Menu
              isOpen={isOpen}
              boxClass="w-[12rem] top-[5rem] right-0 flex flex-col gap-2 text-text-primary text-[1.4rem]"
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
                onClick={() => {
                  /* logout handler 추가 예정 */
                }}
              >
                로그아웃
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
      {/* <LogoutComponent isOpen={isLogoutOpen} onClose={closeLogout} /> */}
    </div>
  );
};

export default UserAccount;
