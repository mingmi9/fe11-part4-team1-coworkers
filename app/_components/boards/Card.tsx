'use client';
import { ReactNode } from 'react';
import Image from 'next/image';
import { formatDate } from '@/_lib/utils/format-date';
import classNames from 'classnames';

const SubText = 'text-xs text-text-disabled font-normal tablet:text-sm';

export const Medal = () => (
  <div className="mb-[1.4rem] flex items-center gap-[.4rem] text-sm font-semibold text-white">
    <Image src="/icons/ic-medal.svg" alt="medal" width={16} height={16} />
    <div>Best</div>
  </div>
);

export const Title = ({ children }: { children: ReactNode }) => (
  <div className="line-clamp-2 text-sm text-text-secondary tablet:text-lg">
    {children}
  </div>
);

export const PreviewImage = ({ src }: { src: string }) => (
  <div className="relative ml-[1.6rem] size-[6.4rem] flex-shrink-0 overflow-hidden rounded-[.8rem] tablet:size-[7.2rem]">
    <Image
      src={src}
      alt="게시글 이미지"
      fill
      sizes="7.2rem"
      className="bg-blue-50 object-cover"
    />
  </div>
);

export const Date = ({ date }: { date: string }) => {
  const formattedDate = formatDate(date, 'YYYY.M.D');
  return <div className={`${SubText}`}>{formattedDate}</div>;
};

export const Profile = ({ nickname }: { nickname: string }) => (
  <div className="flex items-center gap-[1.2rem]">
    <div className="relative size-[3.2rem]">
      <Image
        src="/icons/member.svg"
        alt="프로필"
        fill
        sizes="3.2rem"
        className="object-cover"
      />
    </div>
    <div className="text-xs font-medium tablet:text-sm">{nickname}</div>
  </div>
);

export const LikeButton = ({
  likeCount,
  liked,
  onClick,
}: {
  likeCount: number;
  liked: boolean;
  onClick?: () => void;
}) => {
  const displayedLikeCount = likeCount > 9999 ? '9999+' : likeCount;
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex items-center gap-[.4rem] text-xs font-normal tablet:text-sm',
        { 'text-red-500': liked, 'text-text-disabled': !liked },
        { 'cursor-pointer': onClick, 'cursor-default': !onClick },
      )}
    >
      <Image
        src={liked ? '/icons/ic-liked.svg' : '/icons/ic-like.svg'}
        alt="좋아요"
        width={16}
        height={16}
      />
      {displayedLikeCount}
    </button>
  );
};

export const Divider = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`h-[1px] w-full bg-text-primary opacity-[10%] ${className}`}
    />
  );
};

export const DateDivider = () => {
  return (
    <span className="mx-[.8rem] h-[1.2rem] w-[.1rem] bg-background-tertiary tablet:mx-[1.6rem]"></span>
  );
};

export const DetailImage = ({ src }: { src: string }) => (
  <div className="relative ml-[1.6rem] size-[18rem] flex-shrink-0 overflow-hidden rounded-[.8rem] tablet:size-[50rem]">
    <Image
      src={src}
      alt="게시글 이미지"
      fill
      sizes="18rem"
      className="bg-blue-50 object-cover"
    />
  </div>
);

export const CommentText = ({ children }: { children: ReactNode }) => (
  <div className="line-clamp-2 text-sm text-text-primary tablet:text-base">
    {children}
  </div>
);

export const CommentCount = ({
  commentCount,
  onClick,
}: {
  commentCount: number;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-[.4rem] ${SubText}`}
  >
    <Image src="/icons/ic-comment.svg" alt="댓글" width={16} height={16} />
    {commentCount}
  </button>
);

const Card = Object.assign(
  (props: { children: ReactNode }) => <>{props.children}</>,
  {
    Medal,
    Title,
    PreviewImage,
    Date,
    Profile,
    LikeButton,
    Divider,
    DateDivider,
    DetailImage,
    CommentText,
    CommentCount,
  },
);

export default Card;
