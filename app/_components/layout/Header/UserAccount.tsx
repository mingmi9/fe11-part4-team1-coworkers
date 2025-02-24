'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useAuthStore } from '@/_store/auth-store';

import Dropdown from '@/_components/common/Dropdown';
import LogoutModal from '@/_components/modal/LogoutModal';

const UserAccount = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  
  const mockUser = {
    teamId: "team-1",
    image: "https://picsum.photos/200",  // 랜덤 프로필 이미지
    nickname: "홍길동",
    email: "test@example.com",
    id: 1,
    memberships: [
      {
        group: {
          teamId: "team-1",
          image: "https://picsum.photos/200/300",  // 랜덤 팀 이미지 1
          name: "Team Alpha",
          id: 1
        },
        role: "ADMIN",
        userImage: "https://picsum.photos/200",
        userEmail: "test@example.com",
        userName: "홍길동",
        groupId: 1,
        userId: 1
      },
      {
        group: {
          teamId: "team-2",
          image: "https://picsum.photos/201/300",  // 랜덤 팀 이미지 2
          name: "Team Beta",
          id: 2
        },
        role: "ADMIN",
        userImage: "https://picsum.photos/200",
        userEmail: "test@example.com",
        userName: "홍길동",
        groupId: 2,
        userId: 1
      }
    ]
  };


  return (
    <div aria-label="사용자 메뉴">
      <Dropdown>
        {({isOpen, toggleDropdown}) => (
          <>
            <Dropdown.Button 
              onClick={toggleDropdown}
              aria-expanded={isOpen}
              aria-haspopup="true"
              className="flex items-center p-1 rounded-xl hover:bg-gray-50/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                  <Image
                    src={mockUser.image || '/icons/user.svg'}
                    alt={mockUser.nickname}
                    width={32}
                    height={32}
                    sizes="3.2rem"
                    className="rounded-full size-[3.2rem] object-cover"
                  />
                <span className="text-text-primary hidden tablet:inline">{mockUser.nickname}</span>
              </div>
            </Dropdown.Button>
            <Dropdown.Menu
              isOpen={isOpen}
              boxClass="w-[12rem] top-[5rem] right-0 flex flex-col gap-2 text-text-primary text-[1.4rem]"
            >
              <Link href="/myhistory" className="w-full">
                <Dropdown.Item 
                  toggleDropdown={toggleDropdown} 
                  className="rounded-xl justify-center"
                >
                  마이 히스토리
                </Dropdown.Item>
              </Link>
              <Link href="/mypage" className="w-full">
                <Dropdown.Item 
                  toggleDropdown={toggleDropdown} 
                  className="rounded-xl justify-center"
                >
                  계정 설정
                </Dropdown.Item>
              </Link>
              <Dropdown.Item 
                toggleDropdown={toggleDropdown} 
                className="rounded-xl justify-center"
                onClick={() => setIsLogoutOpen(true)}
              >
                로그아웃
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
      <LogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </div>
  );
};

export default UserAccount;
