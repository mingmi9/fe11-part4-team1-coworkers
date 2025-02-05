'use client';
import Image from 'next/image';
import Dropdown from '@/_components/common/Dropdown';

interface SortDropdownProps {
  selectedOption: string;
  onSelect: (value: string) => void;
}

const SortDropdown = ({ selectedOption, onSelect }: SortDropdownProps) => {
  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <Dropdown>
      {({ isOpen, toggleDropdown }) => (
        <>
          <Dropdown.Button onClick={toggleDropdown}>
            <div
              className={`${
                isOpen ? 'bg-background-tertiary' : 'bg-background-secondary'
              } flex w-[9.4rem] items-center justify-between rounded-[0.8rem] px-[1.4rem] py-[1rem] text-xs text-text-primary tablet:w-[12rem] tablet:rounded-[1.2rem] tablet:text-sm`}
            >
              {selectedOption}
              <Image
                src="/icons/toggle.svg"
                alt=""
                width={24}
                height={24}
                className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </Dropdown.Button>
          <Dropdown.Menu
            isOpen={isOpen}
            boxClass="w-full top-[5.2rem]"
            contClass="text-xs tablet:text-sm"
          >
            <Dropdown.Item
              toggleDropdown={toggleDropdown}
              onClick={() => handleSelect('최신순')}
            >
              최신순
            </Dropdown.Item>
            <Dropdown.Item
              toggleDropdown={toggleDropdown}
              onClick={() => handleSelect('인기순')}
            >
              인기순
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      )}
    </Dropdown>
  );
};

export default SortDropdown;
