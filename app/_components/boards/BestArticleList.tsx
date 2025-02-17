'use client';
import { useState, useEffect } from 'react';
import BestArticleCard from './BestArticleCard';
import { Article } from '@/(routes)/boards/type/Article';
import { getArticles } from '@/_lib/api/article-api';

const BestArticleList = () => {
  const [bestArticle, setBestArticle] = useState<Article[]>([]);

  const fetchBestArticles = async () => {
    try {
      const response = await getArticles({
        page: 1,
        pageSize: 3,
        orderBy: 'like',
      });
      const { list } = response;
      setBestArticle(list);
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    fetchBestArticles();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-[1.6rem] tablet:grid-cols-2 pc:grid-cols-3 pc:gap-[2rem]  max-h-[18.5rem] tablet:max-h-[19.3rem] overflow-hidden">
      {bestArticle.map((article) => (
        <BestArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default BestArticleList;
