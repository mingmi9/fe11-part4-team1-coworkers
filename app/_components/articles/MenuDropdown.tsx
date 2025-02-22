'use client';
import Image from 'next/image';
import Dropdown from '../common/Dropdown';
import kebab from '@icons/kebab-small-button.svg';
import classNames from 'classnames';

interface MenuDropdownProps {
  menuPosition?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const MenuDropdown = ({
  menuPosition,
  onEdit,
  onDelete,
}: MenuDropdownProps) => {
  return (
    <Dropdown>
      {({ isOpen, toggleDropdown }) => (
        <>
          <Dropdown.Button
            onClick={toggleDropdown}
            className="relative block size-[1.6rem] flex-shrink-0 tablet:size-[2.4rem]"
          >
            <Image
              src={kebab}
              alt="메뉴"
              fill
              className="object-contain hover:brightness-150"
            />
          </Dropdown.Button>
          <Dropdown.Menu
            isOpen={isOpen}
            boxClass={classNames(
              'w-[12rem] right-0 shadow-2xl border-[.1rem] border-background-tertiary',
              menuPosition || 'top-[2.4rem]',
            )}
            contClass="text-sm font-normal"
          >
            <Dropdown.Item
              toggleDropdown={toggleDropdown}
              onClick={() => {
                onEdit();
              }}
              className="justify-center"
            >
              수정하기
            </Dropdown.Item>
            <Dropdown.Item
              toggleDropdown={toggleDropdown}
              onClick={() => {
                onDelete();
              }}
              className="justify-center"
            >
              삭제하기
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      )}
    </Dropdown>
  );
};

export default MenuDropdown;
