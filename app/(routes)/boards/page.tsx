'use client';
import { useState } from 'react';
import Button from '@/_components/common/Button';
import Search from '@/_components/boards/Search';
import BestArticleList from '@/_components/boards/BestArticleList';
import ArticleCard from '@/_components/boards/ArticleCard';
import SortDropdown from '@/_components/boards/SortDropdown';

const BoardsPage = () => {
  const handleButton = () => alert('글쓰기');
  const [selectedOption, setSelectedOption] = useState<string>('최신순');
  const handleSelect = (value: string) => {
    setSelectedOption(value);
    console.log('선택:', value);
  };
  const articles = [
    {
      createdAt: '2025-01-23T19:18:29.982Z',
      likeCount: 15,
      writer: {
        nickname: '김코딩',
        id: 1,
      },
      image: '/images/kakaotalk.png',
      title:
        '게시글 제목입니다게시글 제목입니다게시글 제목입니다게시글 제목입니다게시글 제목입니다게시글 제목입니다게시글 제목입니다게시글 제목입니다.',
      id: 1,
    },
    {
      createdAt: '2025-01-23T19:18:29.982Z',
      likeCount: 15,
      writer: {
        nickname: '김코딩3',
        id: 2,
      },
      title: '게시글 제목입니다.',
      id: 2,
    },
    {
      createdAt: '2025-01-23T19:18:29.982Z',
      likeCount: 15,
      writer: {
        nickname: '김코딩',
        id: 3,
      },
      image: '/article-image.jpg',
      title: '게시글 제목입니다.',
      id: 3,
    },
    {
      createdAt: '2025-01-22T19:18:29.982Z',
      likeCount: 3,
      writer: {
        nickname: '김코딩',
        id: 5,
      },
      image: '/article-image2.jpg',
      title: '게시글 제목입니다.',
      id: 5,
    },
    {
      createdAt: '2025-01-22T19:18:29.982Z',
      likeCount: 3,
      writer: {
        nickname: '김코딩4',
        id: 6,
      },
      image: '/article-image2.jpg',
      title: '게시글 제목입니다.',
      id: 6,
    },
    {
      createdAt: '2025-01-22T19:18:29.982Z',
      likeCount: 3,
      writer: {
        nickname: '김코딩',
        id: 7,
      },
      image: '/article-image2.jpg',
      title: '게시글 제목입니다.',
      id: 7,
    },
  ];

  return (
    <div className="relative pt-[3.2rem] tablet:pt-[4rem]">
      <h2 className="text-lg font-bold tablet:text-2xl">자유게시판</h2>
      <div className="my-[2.4rem] tablet:my-[3.2rem] pc:my-[4rem]">
        <Search />
      </div>

      <h3 className="mb-[2.4rem] font-medium tablet:mb-[4rem] tablet:text-xl tablet:font-semibold">
        베스트 게시글
      </h3>
      <div>
        <BestArticleList />
      </div>

      <div className="my-[3.2rem] h-[1px] w-full bg-text-primary opacity-[10%] tablet:my-[4rem]"></div>

      <div className="mb-[2.4rem] flex items-center justify-between tablet:mb-[4rem]">
        <h3 className="font-medium tablet:text-xl tablet:font-semibold">
          게시글
        </h3>
        <div>
          <SortDropdown
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[1.6rem] tablet:gap-[2.4rem] tablet:gap-x-[2rem] pc:grid-cols-2">
        {articles.map((article) => (
           <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className="fixed bottom-[6.2rem] right-[1.6rem] tablet:bottom-[4.5rem] tablet:right-[2.4rem] pc:right-[6.5rem]">
        <Button
          size="large"
          icon="plus"
          round="full"
          onClick={handleButton}
          className="w-[10.4rem]"
        >
          글쓰기
        </Button>
      </div>
    </div>
  );
};

export default BoardsPage;
