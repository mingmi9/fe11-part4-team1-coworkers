'use client';
import { useEffect, useState } from 'react';
import { Article } from '@/(routes)/boards/type/Boards';
import Card from './Card';

export interface BestArticleCardProps {
  article: Article;
  onArticleClick: () => void;
}

const BestArticleCard = ({ article, onArticleClick }: BestArticleCardProps) => {
  // 좋아요
  const [likeState, setLikeState] = useState({
    liked: false,
    likeCount: 0,
  });

  useEffect(() => {
    if (article) {
      setLikeState({
        liked: !!article.isLiked,
        likeCount: article.likeCount,
      });
    }
  }, [article]);

  return (
    <div className="relative w-full cursor-default rounded-[1.2rem] border border-background-tertiary bg-background-secondary p-[1.6rem] pt-[1rem] font-medium tablet:px-[2.4rem]">
      {/* 베스트 표시 */}
      <Card.Medal />

      <div className="tablet:h-[10.4rem]flex h-[7.4rem] cursor-pointer items-start justify-between">
        <div
          onClick={onArticleClick}
          className="flex w-full items-start justify-between"
        >
          <div>
            {/* 게시글 제목 */}
            <Card.Title>{article.title}</Card.Title>
            {/* 날짜 */}
            <div className="mt-[1.2rem] tablet:mt-[2.8rem]">
              <Card.Date date={article.createdAt} />
            </div>
          </div>

          {/* 게시글 이미지 */}
          {article.image && <Card.PreviewImage src={article.image} />}
        </div>
      </div>

      <div className="mt-[1.6rem] flex items-center justify-between tablet:mt-[2.4rem]">
        <div className="flex">
          {/* 프로필 */}
          <Card.Profile nickname={article.writer.nickname} />
        </div>

        {/* 좋아요 */}
        <Card.LikeButton
          likeCount={likeState.likeCount}
          liked={likeState.liked}
        />
      </div>
    </div>
  );
};

export default BestArticleCard;
