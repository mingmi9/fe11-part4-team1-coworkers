'use client';

import { ReactNode } from 'react';
import useDropdown from '@/_hooks/useDropdown';

// 드롭다운
interface DropdownProps {
  children: (props: {
    isOpen: boolean;
    toggleDropdown: () => void;
  }) => ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div ref={dropdownRef} className="relative">
      {children({ isOpen, toggleDropdown })}
    </div>
  );
};

// 드롭다운 버튼
interface DropdownButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

const DropdownButton = ({
  children,
  className,
  onClick,
}: DropdownButtonProps) => (
  <button type="button" onClick={onClick} className={className}>
    {children}
  </button>
);

// 드롭다운 메뉴
interface DropdownMenuProps {
  children: ReactNode;
  boxClass?: string;
  contClass?: string;
  isOpen: boolean;
}

const DropdownMenu = ({
  children,
  boxClass,
  contClass,
  isOpen,
}: DropdownMenuProps) => (
  <>
    {isOpen && (
      <div
        className={`absolute z-10 overflow-hidden rounded-[0.8rem] border border-background-secondary bg-background-secondary text-text-primary tablet:rounded-[1.2rem] ${boxClass}`}
      >
        <ul className={`flex flex-col ${contClass}`}>{children}</ul>
      </div>
    )}
  </>
);

// 드롭다운 아이템
interface DropdownItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  toggleDropdown: () => void;
}

const DropdownItem = ({
  children,
  className,
  onClick,
  toggleDropdown,
}: DropdownItemProps) => (
  <li
    className={`flex h-[4rem] w-full cursor-pointer items-center px-[0.8rem] py-[0.4rem] transition-colors hover:bg-background-tertiary tablet:px-[1.6rem] ${className}`}
    onClick={() => {
      onClick?.();
      toggleDropdown();
    }}
  >
    {children}
  </li>
);

Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.Button = DropdownButton;

export default Dropdown;
