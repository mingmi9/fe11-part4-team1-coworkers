'use client';
import { useEffect, useState } from 'react';
import Button from '@/_components/common/Button';
import Search from '@/_components/boards/Search';
import BestArticleList from '@/_components/boards/BestArticleList';
import ArticleCard from '@/_components/boards/ArticleCard';
import SortDropdown from '@/_components/boards/SortDropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Article } from './type/Article';
import { getArticles } from '@/_lib/api/article-api';

const BoardsPage = () => {
  const handleButton = () => alert('글쓰기');
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortOrder, setSortOrder] = useState<'recent' | 'like'>('recent');
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 4;

  const fetchArticles = async (
    page = 1,
    order: 'recent' | 'like' = 'recent',
    searchKeyword = '',
  ) => {
    try {
      setIsLoading(true);
      const response = await getArticles({
        page: page,
        pageSize: pageSize,
        orderBy: order,
        keyword: searchKeyword,
      });
      console.log('리스폰스:', response);
      const { list } = response;

      if (page === 1) {
        setArticles(list);
      } else {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...list.filter(
            (article: Article) =>
              !prevArticles.some(
                (prevArticle) => prevArticle.id === article.id,
              ),
          ),
        ]);
      }

      if (list.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchArticles(1, sortOrder, keyword);
  }, [keyword, sortOrder]);

  useEffect(() => {
    if (page > 1) {
      fetchArticles(page, sortOrder, keyword);
    }
  }, [page, sortOrder, keyword]);

  // 정렬 순서
  const handleSelect = (value: string) => {
    if (value === 'recent' || value === 'like') {
      setSortOrder(value);
      setPage(1);
    } else {
      console.error('Invalid value:', value);
    }
  };
  // 검색
  const handleSearchChange = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setPage(1);
  };
   // 검색 결과 없음
   const searchNoResults = keyword && articles.length === 0 && !isLoading;

  return (
    <div className="relative pt-[3.2rem] tablet:pt-[4rem]">
      <h2 className="text-lg font-bold tablet:text-2xl">자유게시판</h2>
      <div className="my-[2.4rem] tablet:my-[3.2rem] pc:my-[4rem]">
        <Search onChange={handleSearchChange} />
      </div>

      {!keyword && (
        <div>
          <h3 className="mb-[2.4rem] font-medium tablet:mb-[4rem] tablet:text-xl tablet:font-semibold">
            베스트 게시글
          </h3>
          <BestArticleList />
        </div>
      )}

      <div className="my-[3.2rem] h-[1px] w-full bg-text-primary opacity-[10%] tablet:my-[4rem]"></div>

      <div className="mb-[2.4rem] flex items-center justify-between tablet:mb-[4rem]">
        <h3 className="font-medium tablet:text-xl tablet:font-semibold">
          게시글
        </h3>
        <div>
          <SortDropdown selectedOption={sortOrder} onSelect={handleSelect} />
        </div>
      </div>

      {searchNoResults && (
        <div className="p-[1.6rem] tablet:py-[2rem] text-center tablet:text-lg text-text-disabled">
          검색 결과가 없습니다.
        </div>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
      >
        <div className="grid grid-cols-1 gap-[1.6rem] tablet:gap-[2.4rem] tablet:gap-x-[2rem] pc:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </InfiniteScroll>

      <div className="fixed bottom-[6.2rem] right-[1.6rem] tablet:bottom-[4.5rem] tablet:right-[2.4rem] pc:right-[6.5rem]">
        <Button
          icon="plus"
          round="full"
          onClick={handleButton}
          className="w-[10.4rem] text-[1.5rem]"
        >
          글쓰기
        </Button>
      </div>
    </div>
  );
};

export default BoardsPage;
