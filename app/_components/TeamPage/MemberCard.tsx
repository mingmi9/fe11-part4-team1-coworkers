import defaultImg from '@icons/member.svg';
import kebab from '@icons/kebab-small-button.svg';
import Image from 'next/image';
import Dropdown from '../common/Dropdown';
import { useState } from 'react';
import ProfileModal from '../modal/ProfileModal';
import KickUserModal from '../modal/KickUserModal';

interface MemberCardProps {
  profileImg?: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function MemberCard({
  profileImg,
  name,
  email,
  isAdmin,
}: MemberCardProps) {
  const [isOpenCopyModal, setIsOpenCopyModal] = useState(false);
  const [isOpenKickModal, setIsOpenKickModal] = useState(false);

  const handleCopyModal = () => {
    setIsOpenCopyModal(true);
  };

  const handleKickMember = () => {
    setIsOpenKickModal(true);
  };

  return (
    <div className="flex items-center justify-between break-all rounded-2xl bg-background-secondary px-[2.4rem] py-[2rem] mobile:w-[16.35rem] tablet:w-[22.1rem] pc:w-[38.9rem]">
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
      <div>
        <Dropdown>
          {({ isOpen, toggleDropdown }) => (
            <>
              <Dropdown.Button onClick={toggleDropdown}>
                <div className="h-[1.6rem] w-[1.6rem] flex-shrink-0">
                  <Image
                    src={kebab}
                    width={16}
                    height={16}
                    alt="케밥"
                    className="hover:brightness-150"
                  />
                </div>
              </Dropdown.Button>
              <Dropdown.Menu
                isOpen={isOpen}
                boxClass="w-[10rem] top-[2rem] right-0 shadow-2xl border-[0.1rem] border-border-primary/10"
              >
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  onClick={handleCopyModal}
                  className="justify-center"
                >
                  복사하기
                </Dropdown.Item>
                {isAdmin ? (
                  <Dropdown.Item
                    toggleDropdown={toggleDropdown}
                    onClick={handleKickMember}
                    className="justify-center"
                  >
                    추방하기
                  </Dropdown.Item>
                ) : (
                  ''
                )}
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>

        <ProfileModal
          isOpen={isOpenCopyModal}
          onClose={() => setIsOpenCopyModal(false)}
          profileImg={profileImg}
          name={name}
          email={email}
        />
        <KickUserModal
          isOpen={isOpenKickModal}
          onClose={() => setIsOpenKickModal(false)}
          name={name}
        />
      </div>
    </div>
  );
}
