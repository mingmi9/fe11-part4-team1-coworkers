'use client';

import React, { useState } from 'react';
import Dropdown from '../_components/common/Dropdown';
import Image from 'next/image';

const DropdownPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>('최신순');

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    console.log('선택:', value);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6">
      {/* 버튼형 드롭다운 예시 */}
      <Dropdown>
        {({ isOpen, toggleDropdown }) => (
          <>
            <Dropdown.Button onClick={toggleDropdown}>
              <div className="rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-text-default transition-colors hover:bg-gray-100">
                ⋮
              </div>
            </Dropdown.Button>
            <Dropdown.Menu
              isOpen={isOpen}
              boxClass="right-0"
              contClass="w-[13.5rem] text-sm tablet:text-base"
            >
              <Dropdown.Item
                toggleDropdown={toggleDropdown}
                onClick={() => handleSelect('마이 히스토리')}
                className="justify-center"
              >
                마이 히스토리
              </Dropdown.Item>
              <Dropdown.Item
                toggleDropdown={toggleDropdown}
                onClick={() => handleSelect('계정 설정')}
                className="justify-center"
              >
                계정 설정
              </Dropdown.Item>
              <Dropdown.Item
                toggleDropdown={toggleDropdown}
                onClick={() => handleSelect('팀 참여')}
                className="justify-center"
              >
                팀 참여
              </Dropdown.Item>
              <Dropdown.Item
                toggleDropdown={toggleDropdown}
                onClick={() => handleSelect('로그아웃')}
                className="justify-center"
              >
                로그아웃
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>

      {/* 셀렉트형 드롭다운 예시*/}
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
                  className="ml-2"
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
    </div>
  );
};

export default DropdownPage;
