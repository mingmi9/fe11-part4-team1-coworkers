'use client';
import { useArticle } from '@/_hooks/useArticle';
import BestArticleCard from './BestArticleCard';
import { Article } from '@/(routes)/boards/type/Boards';

interface BestArticleListProps {
  onArticleClick: (articleId: number) => void;
}

const BestArticleList = ({ onArticleClick }: BestArticleListProps) => {
  const { useGetArticles } = useArticle();
  const { data, isLoading, isError } = useGetArticles({
    page: 1,
    pageSize: 3,
    orderBy: 'like',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const bestArticle = data?.list || [];
  
  return (
    <div className="grid max-h-[18.5rem] grid-cols-1 gap-[1.6rem] overflow-hidden tablet:max-h-[19.3rem] tablet:grid-cols-2 pc:grid-cols-3 pc:gap-[2rem]">
      {bestArticle.map((article: Article) => (
        <BestArticleCard
          key={article.id}
          article={article}
          onArticleClick={() => onArticleClick(article.id)}
        />
      ))}
    </div>
  );
};

export default BestArticleList;
