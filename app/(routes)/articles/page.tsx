'use client';
import { useEffect, useState } from 'react';
import Button from '@/_components/common/Button';
import Search from '@/_components/articles/Search';
import BestArticleList from '@/_components/articles/BestArticleList';
import ArticleCard from '@/_components/articles/ArticleCard';
import SortDropdown from '@/_components/articles/SortDropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Article } from './type/Articles';
import { useArticle } from '@/_hooks/useArticle';
import { Divider } from '@/_components/articles/Card';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/_store/auth-store';

const pageSize = 6;
const ArticlesPage = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortOrder, setSortOrder] = useState<'recent' | 'like'>('recent');
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { useGetArticles } = useArticle();
  const { data, isLoading, isError } = useGetArticles({
    page,
    pageSize,
    orderBy: sortOrder,
    keyword,
  });

  useEffect(() => {
    if (data) {
      const { list } = data;

      if (page === 1) {
        setArticles(list);
      } else {
        setArticles((prevArticles) => {
          const newArticles = list.filter(
            (newArticle: Article) =>
              !prevArticles.some((article) => article.id === newArticle.id),
          );
          return [...prevArticles, ...newArticles];
        });
      }
      setHasMore(list.length === pageSize);
    }
  }, [data, page]);

  // 정렬 순서
  const handleSelect = (value: 'recent' | 'like') => {
    setSortOrder(value);
    setPage(1);
  };

  // 검색
  const handleSearchChange = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setPage(1);
    setSortOrder('recent');
  };

  // 검색 결과 없음
  const searchNoResults = keyword && articles.length === 0 && !isLoading;

  // 게시글 삭제
  const handleDelete = (articleId: number) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== articleId),
    );
  };

  // 게시글 이동
  const handleCardClick = (articleId: number) => {
    router.push(`/articles/${articleId}`);
  };

  // 게시글 작성 페이지
  const handleCreateClick = () => {
    router.push('/articles/create');
  };

  // 오류
  if (isError) {
    alert('다시 시도해 주세요.');
    router.push('/');
  }

  return (
    <div className="relative cursor-default py-[3.2rem] tablet:py-[4rem]">
      <h2 className="text-lg font-bold tablet:text-2xl">자유게시판</h2>
      <div className="my-[2.4rem] tablet:my-[3.2rem] pc:my-[4rem]">
        <Search onChange={handleSearchChange} />
      </div>

      {!keyword && (
        <div>
          <h3 className="mb-[2.4rem] font-medium tablet:mb-[4rem] tablet:text-xl tablet:font-semibold">
            베스트 게시글
          </h3>
          <BestArticleList onArticleClick={handleCardClick} />
        </div>
      )}

      <Divider className="my-[3.2rem] tablet:my-[4rem]" />

      <div className="mb-[2.4rem] flex items-center justify-between tablet:mb-[4rem]">
        <h3 className="font-medium tablet:text-xl tablet:font-semibold">
          게시글
        </h3>
        <div>
          <SortDropdown selectedOption={sortOrder} onSelect={handleSelect} />
        </div>
      </div>

      {searchNoResults && (
        <div className="p-[1.6rem] text-center text-text-disabled tablet:py-[2rem] tablet:text-lg">
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
          {articles.map((article: Article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onArticleClick={() => handleCardClick(article.id)}
              onDelete={() => handleDelete(article.id)}
            />
          ))}
        </div>
      </InfiniteScroll>

      {isLoggedIn && (
        <div className="fixed bottom-[6.2rem] right-[1.6rem] tablet:bottom-[4.5rem] tablet:right-[2.4rem] pc:right-[6.5rem]">
          <Button
            icon="plus"
            round="full"
            onClick={handleCreateClick}
            className="w-[10.4rem] text-[1.5rem]"
          >
            글쓰기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
