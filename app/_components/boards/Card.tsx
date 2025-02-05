'use client';
import { ReactNode } from 'react';
import Image from 'next/image';
import { formatDate } from '@/_lib/utils/format-date';
import classNames from 'classnames';

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
  return <>{formattedDate}</>;
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
    <div className="text-sm font-medium">{nickname}</div>
  </div>
);

export const LikeButton = ({
  likeCount,
  onLikeClick,
  liked,
}: {
  likeCount: number;
  onLikeClick: () => void;
  liked: boolean;
}) => {
  const displayedLikeCount = likeCount > 9999 ? '9999+' : likeCount;
  return (
    <button
      onClick={onLikeClick}
      className={classNames(
        'flex items-center gap-[.4rem] text-xs font-normal tablet:text-sm',
        { 'text-red-500': liked, 'text-text-disabled': !liked },
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

const Card = Object.assign(
  (props: { children: ReactNode }) => <>{props.children}</>,
  {
    Medal,
    Title,
    PreviewImage,
    Date,
    Profile,
    LikeButton,
  },
);

export default Card;
