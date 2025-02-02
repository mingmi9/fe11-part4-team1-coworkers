'use client';
import { useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/_lib/utils/format-date';
import MenuDropdown from './MenuDropdown';
import likeImage from '@icons/ic-like.svg';
import likedImage from '@icons/ic-liked.svg';

export interface Writer {
  nickname: string;
  id: number;
}

export interface Article {
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image?: string | null;
  title: string;
  id: number;
}

export interface ArticleCardProps {
  article: Article;
  onClickMenu?: () => void;
  isBest?: boolean;
}

const ArticleCard = ({ article, isBest = false }: ArticleCardProps) => {
  // 좋아요
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(article.likeCount);
  const displayedLikeCount = likeCount > 9999 ? '9999+' : likeCount;

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  // 메뉴
  const handleEdit = () => {
    console.log('수정하기');
  };

  const handleDelete = () => {
    console.log('삭제하기');
  };

  const formattedDate = formatDate(article.createdAt, 'YYYY.M.D');
  const subText = 'text-xs text-text-disabled font-normal tablet:text-sm';

  return (
    <div
      className={`cursor-default relative w-full rounded-[1.2rem] border-background-tertiary bg-background-secondary p-[1.6rem] font-medium ${isBest ? 'border pt-[1rem] tablet:px-[2.4rem]' : 'pt-[2.4rem] tablet:border tablet:px-[3.2rem] tablet:py-[2.4rem]'}`}
    >
      {/* 베스트 표시 */}
      {isBest && (
        <div className="mb-[1.4rem] flex items-center gap-[.4rem] text-sm font-semibold text-white">
          <Image src="/icons/ic-medal.svg" alt="medal" width={16} height={16} />
          <div>Best</div>
        </div>
      )}

      <div
        className={`${isBest ? 'tablet:h-[10.4rem]' : 'tablet:h-[7.2rem]'} cursor-pointer flex h-[7.4rem] items-start justify-between`}
      >
        <div className="flex w-full items-start justify-between">
          <div>
            {/* 게시글 제목 */}
            <div className="line-clamp-2 text-sm text-text-secondary tablet:text-lg">
              {article.title}
            </div>
            {/* 날짜 */}
            <div
              className={`${isBest ? '' : 'tablet:hidden'} mt-[1.2rem] tablet:mt-[2.8rem] ${subText}`}
            >
              {formattedDate}
            </div>
          </div>

          {/* 게시글 이미지 */}
          {article.image && (
            <div className="relative ml-[1.6rem] size-[6.4rem] flex-shrink-0 overflow-hidden rounded-[.8rem] tablet:size-[7.2rem]">
              <Image
                src={article.image}
                alt="게시글 이미지"
                fill
                className="bg-blue-50 object-cover"
              />
            </div>
          )}
        </div>

        {/* 메뉴 */}
        <div className={`${isBest ? '' : 'tablet:block'} hidden`}>
          <MenuDropdown onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      <div className="mt-[1.6rem] flex items-center justify-between tablet:mt-[2.4rem]">
        <div className="flex">
          {/* 프로필 */}
          <div className="flex items-center gap-[1.2rem]">
            <div className="relative size-[3.2rem]">
              <Image
                src="/icons/member.svg"
                alt="프로필"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm font-medium">{article.writer.nickname}</div>
          </div>

          {/* 날짜 */}
          <div
            className={`${isBest ? '' : 'tablet:flex'} hidden items-center ${subText}`}
          >
            <span className="mx-[1.6rem] h-[1.2rem] w-[.1rem] bg-background-tertiary"></span>
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center">
          {/* 좋아요 */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-[.4rem] ${subText} ${liked ? 'text-red-500' : 'text-text-secondary'}`}
          >
            <Image
              src={liked ? likedImage : likeImage}
              alt="좋아요"
              width={16}
              height={16}
            />
            {displayedLikeCount}
          </button>
          {/* 메뉴 */}
          <div className={`${isBest ? '' : 'tablet:hidden'} `}>
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
