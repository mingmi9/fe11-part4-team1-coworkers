'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SearchProps {
  onChange: (keyword: string) => void;
}

const Search = ({ onChange }: SearchProps) => {
  const [debounce, setDebounce] = useState<string>('');

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
    <div className="flex w-full gap-[.8rem] rounded-[1.2rem] border border-background-tertiary bg-background-secondary px-[1.6rem] py-[1.2rem] tablet:gap-[1.2rem] tablet:p-[1.6rem]">
      <Image
        src="/icons/ic-search-board.svg"
        alt="검색"
        width={24}
        height={24}
      />
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="w-full bg-transparent text-sm font-normal placeholder-text-default focus:outline-none tablet:text-base"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
