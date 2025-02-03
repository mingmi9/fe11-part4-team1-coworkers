'use client';
import { useState } from 'react';
import MenuDropdown from './MenuDropdown';
import { Article } from '@/(routes)/boards/type/Article';
import Card from './Card';

export interface BestArticleCardProps {
  article: Article;
  onClickMenu?: () => void;
}

const BestArticleCard = ({ article }: BestArticleCardProps) => {
  // 좋아요
  const [likeState, setLikeState] = useState({
    liked: false,
    likeCount: article.likeCount,
  });
  
  const handleLikeClick = () => {
    setLikeState((prev) => ({
      liked: !prev.liked,
      likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));
  };

  // 메뉴
  const handleEdit = () => {
    console.log('수정하기');
  };

  const handleDelete = () => {
    console.log('삭제하기');
  };

  const subText = 'text-xs text-text-disabled font-normal tablet:text-sm';

  return (
    <div
      className={`relative w-full cursor-default rounded-[1.2rem] border border-background-tertiary bg-background-secondary p-[1.6rem] pt-[1rem] font-medium tablet:px-[2.4rem]`}
    >
      {/* 베스트 표시 */}
      <Card.Medal />

      <div
        className={`tablet:h-[10.4rem]flex h-[7.4rem] cursor-pointer items-start justify-between`}
      >
        <div className="flex w-full items-start justify-between">
          <div>
            {/* 게시글 제목 */}
            <Card.Title>{article.title}</Card.Title>
            {/* 날짜 */}
            <div
              className={`mt-[1.2rem] tablet:mt-[2.8rem] ${subText}`}
            >
              <Card.Date date={article.createdAt}  />
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

        <div className="flex items-center">
          {/* 좋아요 */}
          <Card.LikeButton
            likeCount={likeState.likeCount}
            onLikeClick={handleLikeClick}
            liked={likeState.liked}
          />
          {/* 메뉴 */}
            <MenuDropdown
              onEdit={handleEdit}
              onDelete={handleDelete}
              menuPosition="top-[-8.6rem]"
            />
    
        </div>
      </div>
    </div>
  );
};

export default BestArticleCard;
