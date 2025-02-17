'use client';
import { useState } from 'react';
import MenuDropdown from './MenuDropdown';
import { Article } from '@/(routes)/boards/type/Article';
import Card from './Card';

export interface ArticleCardProps {
  article: Article;
  onClickMenu?: () => void;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
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
      className={`relative w-full cursor-default rounded-[1.2rem] border-background-tertiary bg-background-secondary p-[1.6rem] pt-[2.4rem] font-medium tablet:border tablet:px-[3.2rem] tablet:py-[2.4rem]`}
    >
      <div
        className={`flex h-[7.4rem] cursor-pointer items-start justify-between tablet:h-[7.2rem]`}
      >
        <div className="flex w-full items-start justify-between">
          <div>
            {/* 게시글 제목 */}
            <Card.Title>{article.title}</Card.Title>
            {/* 날짜 */}
            <div
              className={`mt-[1.2rem] tablet:mt-[2.8rem] tablet:hidden ${subText}`}
            >
              <Card.Date date={article.createdAt} />
            </div>
          </div>

          {/* 게시글 이미지 */}
          {article.image && <Card.PreviewImage src={article.image} />}
        </div>

        {/* 메뉴 */}
        <div className={`hidden tablet:block`}>
          <MenuDropdown onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      <div className="mt-[1.6rem] flex items-center justify-between tablet:mt-[2.4rem]">
        <div className="flex">
          {/* 프로필 */}
          <Card.Profile nickname={article.writer.nickname} />

          {/* 날짜 */}
          <div className={`hidden items-center tablet:flex ${subText}`}>
            <span className="mx-[1.6rem] h-[1.2rem] w-[.1rem] bg-background-tertiary"></span>
            <Card.Date date={article.createdAt} />
          </div>
        </div>

        <div className="flex items-center">
          {/* 좋아요 */}
          <Card.LikeButton
            likeCount={likeState.likeCount}
            onClick={handleLikeClick}
            liked={likeState.liked}
          />
          {/* 메뉴 */}
          <div className={`tablet:hidden`}>
            <MenuDropdown
              onEdit={handleEdit}
              onDelete={handleDelete}
              menuPosition="top-[-8.6rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
