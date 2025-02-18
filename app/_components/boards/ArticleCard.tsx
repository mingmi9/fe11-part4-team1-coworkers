'use client';
import { useEffect, useState } from 'react';
import MenuDropdown from './MenuDropdown';
import { Article } from '@/(routes)/boards/type/Boards';
import Card from './Card';
import { useAuthStore } from '@/_store/auth-store';
import { useArticle } from '@/_hooks/useArticle';
import { useParams, useRouter } from 'next/navigation';

export interface ArticleCardProps {
  article: Article;
  onArticleClick: () => void;
  onDelete: (articleId: number) => void;
}

const ArticleCard = ({
  article,
  onArticleClick,
  onDelete,
}: ArticleCardProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { id } = useParams();

  const { useDeleteArticle } = useArticle();
  const { mutate: deleteArticle } = useDeleteArticle;

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

  // 메뉴
  const handleEdit = () => {
    router.push(`/boards/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteArticle(article.id, {
        onSuccess: () => {
          alert('삭제되었습니다');
          onDelete(article.id);
        },
        onError: (error) => {
          alert('삭제 실패');
          console.error(error);
        },
      });
    }
  };

  return (
    <div className="relative w-full cursor-default rounded-[1.2rem] border-background-tertiary bg-background-secondary p-[1.6rem] pt-[2.4rem] font-medium tablet:border tablet:px-[3.2rem] tablet:py-[2.4rem]">
      <div className="flex h-[7.4rem] cursor-pointer items-start justify-between tablet:h-[7.2rem]">
        <div
          onClick={onArticleClick}
          className="flex w-full items-start justify-between"
        >
          <div>
            {/* 게시글 제목 */}
            <Card.Title>{article.title}</Card.Title>
            {/* 날짜 */}
            <div className="mt-[1.2rem] tablet:mt-[2.8rem] tablet:hidden">
              <Card.Date date={article.createdAt} />
            </div>
          </div>

          {/* 게시글 이미지 */}
          {article.image && <Card.PreviewImage src={article.image} />}
        </div>

        {/* 메뉴 */}
        {user?.id === article.writer.id && (
          <div className="hidden tablet:block">
            <MenuDropdown onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        )}
      </div>

      <div className="mt-[1.6rem] flex items-center justify-between tablet:mt-[2.4rem]">
        <div className="flex">
          {/* 프로필 */}
          <Card.Profile nickname={article.writer.nickname} />

          {/* 날짜 */}
          <div className="hidden items-center tablet:flex">
            <Card.DateDivider />
            <Card.Date date={article.createdAt} />
          </div>
        </div>

        <div className="flex items-center">
          {/* 좋아요 */}
          <Card.LikeButton
            likeCount={likeState.likeCount}
            liked={likeState.liked}
          />
          {/* 메뉴 */}
          {user?.id === article.writer.id && (
            <div className="tablet:hidden">
              <MenuDropdown
                onEdit={handleEdit}
                onDelete={handleDelete}
                menuPosition="top-[-8.6rem]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
