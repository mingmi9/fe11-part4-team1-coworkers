'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { commonInputClass } from './InputField';

interface SearchProps {
  onChange: (keyword: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
  const [debounce, setDebounce] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  // 포커스 상태
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // 검색어 입력
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(debounce);
    }, 500);

    return () => clearTimeout(timer);
  }, [debounce]);

  return (
    <div
      className={`${isFocused ? 'border-brand-primary' : 'border-background-tertiary'} ${commonInputClass} flex w-full gap-[.8rem] px-[1.6rem] py-[1.2rem] tablet:gap-[1.2rem] tablet:p-[1.6rem]`}
    >
      <Image
        src="/icons/ic-search-board.svg"
        alt="검색"
        width={24}
        height={24}
      />
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="w-full bg-transparent font-normal placeholder-text-default focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
