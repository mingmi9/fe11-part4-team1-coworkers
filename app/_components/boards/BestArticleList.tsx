import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import useResize from '@/_hooks/useResize';

interface Article {
  id: number;
  title: string;
  writer: {
    nickname: string;
    id: number;
  };
  createdAt: string;
  likeCount: number;
  image?: string | null;
}

const BestArticleList = () => {
  const [bestArticle, setBestArticle] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const screenType = useResize();

  const fetchArticle = async () => {
    // try {
    //   const data = await getArticle({
    //     page: 1,
    //     pageSize: visibleCount,
    //     orderBy: 'like',
    //   });
    //   const response = data.data;
    //   setBestArticle(response.list);
    // } catch (error) {
    //   console.error(error);
    // }
    const data: Article[] = [
      {
        id: 1,
        title: 'Top Article 1',
        writer: { nickname: '나나', id: 1 },
        createdAt: '2023-01-01T12:00:00Z',
        likeCount: 15134350,
        image: '/images/kakaotalk.png',
      },

      {
        id: 2,
        title: 'Top Article 2',
        writer: { nickname: '도도', id: 2 },
        createdAt: '2023-01-02T12:00:00Z',
        likeCount: 120,
        image: '/images/kakaotalk.png',
      },

      {
        id: 3,
        title: 'Top Article 3',
        writer: { nickname: '바비', id: 3 },
        createdAt: '2023-01-03T12:00:00Z',
        likeCount: 100,
        image: '/images/kakaotalk.png',
      },

      {
        id: 4,
        title: 'Top Article 4',
        writer: { nickname: '바비', id: 4 },
        createdAt: '2023-01-04T12:00:00Z',
        likeCount: 90,
        image: '/images/kakaotalk.png',
      },
    ];

    setBestArticle(data);
  };

  // 베스트 게시글 레이아웃
  useEffect(() => {
    if (screenType === 'pc') {
      setVisibleCount(3);
    } else if (screenType === 'tablet') {
      setVisibleCount(2);
    } else if (screenType === 'mobile') {
      setVisibleCount(1);
    }
  }, [screenType]);

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-[1.6rem] tablet:grid-cols-2 pc:grid-cols-3 pc:gap-[2rem]">
      {bestArticle.slice(0, visibleCount).map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onClickMenu={() =>
            console.log('Menu clicked for article ' + article.id)
          }
          isBest={true}
        />
      ))}
    </div>
  );
};

export default BestArticleList;
