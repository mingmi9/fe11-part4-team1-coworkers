'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Dropdown from '@components/common/Dropdown';
import toggle from '@icons/toggle.svg';
import defaultTeamIcon from '@icons/default-team-icon.svg';
import { UserDataProps } from '.';

interface TeamSelectorProps {
  isLoggedIn: boolean;
  userData: UserDataProps | null;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  userData,
  isLoggedIn,
}) => {
  const [selectedTeam, setSelectedTeam] = useState(
    userData?.memberships[0]?.group?.name || '내 팀',
  );

  useEffect(() => {
    if (userData?.memberships?.length) {
      setSelectedTeam(userData.memberships[0].group.name);
    }
  }, [userData]);

  if (!isLoggedIn) {
    return;
  }

  if (!userData?.memberships.length) {
    return <Link href="/addteam">팀 생성</Link>;
  }

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
              boxClass="w-[22rem] top-[4rem] p-4 flex flex-col gap-2 items-center shadow-2xl"
            >
              {userData?.memberships.map((membership) => (
                <Link
                  href={`/team/${membership.group.id}`}
                  key={membership.group.id}
                  className="w-full"
                >
                  <Dropdown.Item
                    onClick={() => setSelectedTeam(membership.group.name)}
                    toggleDropdown={toggleDropdown}
                    className="flex h-[4.6rem] w-[18.6rem] items-center justify-between gap-4 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={membership.group.image || defaultTeamIcon}
                        alt={
                          membership.group.image
                            ? `${membership.group.name} 팀 이미지`
                            : '기본 팀 아이콘'
                        }
                        width={32}
                        height={32}
                        sizes="3.2rem"
                        className="size-[3.2rem] rounded-xl object-cover"
                      />
                      <span
                        className="overflow-hidden text-ellipsis whitespace-nowrap font-medium"
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
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  className="mt-4 h-[4.6rem] w-[18.6rem] justify-center rounded-xl border border-brand-primary"
                >
                  + 팀 생성하기
                </Dropdown.Item>
              </Link>
              <Link href="/team/join">
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  className="mt-4 h-[4.6rem] w-[18.6rem] justify-center rounded-xl border border-brand-primary"
                >
                  + 팀 추가하기
                </Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </div>
  );
};

export default TeamSelector;
