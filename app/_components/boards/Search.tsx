import Image from 'next/image';

import { useState, useEffect } from 'react';

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [debounce, setDebounce] = useState<string>(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debounce) {
      console.log('test', debounce);
      // fetchArticles(debounce);
    }
  }, [debounce]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div className="flex w-full gap-[.8rem] rounded-[1.2rem] border border-background-tertiary bg-background-secondary px-[1.6rem] py-[1.2rem] tablet:p-[1.6rem] tablet:gap-[1.2rem]">
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
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
