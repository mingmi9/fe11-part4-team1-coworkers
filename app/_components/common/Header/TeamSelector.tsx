'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Dropdown from '@components/common/Dropdown';
import toggle from '@icons/toggle.svg'
import defaultTeamIcon from '@icons/default-team-icon.svg'


const mockUser = {
  teamId: "team-1",
  image: "https://picsum.photos/200",
  nickname: "Test User",
  email: "test@example.com",
  id: 1,
  memberships: [
    {
      group: {
        teamId: "team-1",
        image: "",
        name: "인사팀",
        id: 1,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01"
      },
      role: "ADMIN",
      userImage: "https://picsum.photos/200",
      userEmail: "test@example.com",
      userName: "Test User",
      groupId: 1,
      userId: 1
    },
    {
      group: {
        teamId: "team-2",
        image: "https://picsum.photos/200/300",
        name: "재무팀일까말까용용용",
        id: 2,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01"
      },
      role: "ADMIN",
      userImage: "https://picsum.photos/200",
      userEmail: "test@example.com",
      userName: "Test User",
      groupId: 2,
      userId: 1
    }
  ]
};

const TeamSelector: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState(mockUser.memberships[0].group.name);
  
  // if (!user?.memberships.length) {
  //   return (
  //     <Link href="/addteam">
  //       팀 생성
  //     </Link>
  //   )
  // }

  return (
    <div aria-label="팀 선택">
      <Dropdown>
        {({ isOpen, toggleDropdown }) => (
          <>
            <Dropdown.Button 
              onClick={toggleDropdown}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center justify-center gap-2">
                <span>{selectedTeam}</span>
                <Image 
                  src={toggle}
                  alt="토글 아이콘"
                  width={24}
                  height={24}
                  sizes="2.4rem"
                  className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </Dropdown.Button>
            <Dropdown.Menu
              isOpen={isOpen}
              boxClass="w-[22rem] top-[4rem] p-4 flex flex-col gap-2 items-center"
            >
              {mockUser.memberships.map((membership) => (
                <Link 
                  href={`/team/${membership.group.id}`} 
                  key={membership.group.id}
                  className="w-full"
                >
                  <Dropdown.Item 
                    onClick={() => setSelectedTeam(membership.group.name)} 
                    toggleDropdown={toggleDropdown}
                    className="flex items-center justify-between gap-4 w-[18.6rem] h-[4.6rem] rounded-xl">
                    <div className="flex items-center gap-4">
                      <Image 
                        src={membership.group.image || defaultTeamIcon}
                        alt={membership.group.image ? `${membership.group.name} 팀 이미지` : "기본 팀 아이콘"}
                        width={32}
                        height={32}
                        sizes="3.2rem"
                        className="rounded-md size-[3.2rem] object-cover"
                      />
                      <span 
                        className="font-medium overflow-hidden text-ellipsis whitespace-nowrap"
                        title={membership.group.name}
                      >
                        {membership.group.name}
                      </span>
                    </div>
                    <span className="text-icon-primary">⁝</span>
                  </Dropdown.Item>
                </Link>
              ))}
              
              <Link href="/addteam">
                <Dropdown.Item toggleDropdown={toggleDropdown} className="w-[18.6rem] h-[4.6rem] rounded-xl border border-brand-primary justify-center mt-4">
                  + 팀 추가하기
                </Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </div>
  )
};

export default TeamSelector;
