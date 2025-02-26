'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Comment } from '../type/Articles';
import Card from '@/_components/articles/Card';
import Button from '@/_components/common/Button';
import CommentCard from '@/_components/articles/CommentCard';
import MenuDropdown from '@/_components/articles/MenuDropdown';
import { commonInputClass } from '@/_components/articles/InputField';
import LoadingSpinner from '@/_components/common/LoadingSpinner';

import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/_store/auth-store';
import { useArticle } from '@/_hooks/useArticle';
import { useArticleComment } from '@/_hooks/useArticleComment';
import { useLike } from '@/_hooks/useLike';

const ArticlePage = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const { id } = useParams();
  const [newComment, setNewComment] = useState<string>('');
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const commentSectionRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();
  const { useGetArticlesById, useDeleteArticle } = useArticle();
  const {
    useGetArticleComment,
    useCreateArticleComment,
    useUpdateArticleComment,
    useDeleteArticleComment,
  } = useArticleComment();
  const articleId = Number(id);

  // 게시글 상세 조회
  const { data: article, isLoading, isError } = useGetArticlesById(articleId);

  // 게시글 수정페이지 이동
  const handleEdit = () => {
    router.push(`/articles/${id}/edit`);
  };

  // 게시글 삭제
  const { mutate: deleteArticle, isPending: isDeleteArticlePending } =
    useDeleteArticle;

  const handleDelete = () => {
    if (!id) {
      return;
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteArticle(articleId, {
        onSuccess: () => {
          alert('게시글이 삭제되었습니다.');
          router.push('/articles');
        },
        onError: (error: Error) => {
          console.error('게시글 삭제 실패:', error);
          alert('게시글 삭제에 실패했습니다.');
        },
      });
    }
  };

  // 댓글 조회
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetArticleComment(articleId, { limit: 5, article: article });

  // 댓글 상태 업데이트
  useEffect(() => {
    if (commentsData) {
      setCommentsList(commentsData.pages.flatMap((page) => page.list));
    }
  }, [commentsData]);

  // 댓글 더보기
  const handleLoadMoreComments = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // 댓글 작성
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateArticleComment;

  const handleCommentSubmit = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
      return;
    }

    if (newComment.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    createComment(
      { articleId: articleId, content: newComment },
      {
        onSuccess: () => {
          setNewComment('');
          alert('댓글이 등록되었습니다.');
          queryClient.invalidateQueries({
            queryKey: ['articleComments', articleId],
          });
        },
        onError: () => {
          alert('댓글 등록에 실패했습니다.');
        },
      },
    );
  };

  // 댓글 수정
  const { mutate: updateComment } = useUpdateArticleComment;

  const handleUpdateComment = async (
    commentId: number,
    newContent: string,
    articleId: number,
  ) => {
    updateComment(
      { commentId, content: newContent, articleId },
      {
        onSuccess: () => {
          alert('댓글이 수정되었습니다.');
        },
        onError: (error) => {
          console.error('댓글 수정 실패:', error);
          alert('댓글 수정에 실패했습니다.');
        },
      },
    );
  };

  // 댓글 삭제
  const { mutate: deleteComment } = useDeleteArticleComment;

  const handleDeleteComment = async (commentId: number, articleId: number) => {
    deleteComment(
      { commentId, articleId },
      {
        onSuccess: () => {
          alert('댓글이 삭제되었습니다.');
        },
        onError: (error) => {
          console.error('댓글 삭제 실패:', error);
          alert('댓글 삭제에 실패했습니다.');
        },
      },
    );
  };

  // 댓글로 위치 이동
  const scrollToComments = () => {
    if (commentSectionRef.current) {
      const top = commentSectionRef.current.offsetTop;
      window.scrollTo({
        top: top - 90,
        behavior: 'smooth',
      });
    }
  };

  // 좋아요
  const { mutate: likeArticle } = useLike();
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

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
      return;
    }

    const newLikedState = !likeState.liked;

    setLikeState((prev) => ({
      liked: newLikedState,
      likeCount: newLikedState ? prev.likeCount + 1 : prev.likeCount - 1,
    }));

    try {
      await likeArticle({
        articleId: article.id,
        liked: newLikedState,
      });
    } catch (error) {
      console.error('좋아요 실패', error);
      setLikeState((prev) => ({
        liked: !newLikedState,
        likeCount: prev.likeCount + (newLikedState ? -1 : 1),
      }));
    }
  };

  // 로딩 및 오류
  if (isLoading || isCommentsLoading || isDeleteArticlePending) {
    return (
      <div className="mt-[10rem]">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !article || !id) {
    alert('다시 시도해 주세요.');
    router.push('/');
    return;
  }

  return (
    <div className="py-[6.4rem] tablet:py-[8rem]">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-text-secondary tablet:text-lg">
          {article.title}
        </h2>
        {user?.id === article.writer.id && (
          <MenuDropdown onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      <Card.Divider className="my-[1.6rem]" />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* 프로필 */}
          <Card.Profile nickname={article.writer.nickname} />
          {/* 날짜 */}
          <div className="flex items-center">
            <Card.DateDivider />
            <Card.Date date={article.createdAt} />
          </div>
        </div>
        <div className="flex items-center gap-[.8rem] tablet:gap-[1.6rem]">
          <Card.CommentCount
            commentCount={article.commentCount || 0}
            onClick={scrollToComments}
          />
          <Card.LikeButton
            likeCount={likeState.likeCount}
            onClick={handleLikeClick}
            liked={likeState.liked}
          />
        </div>
      </div>
      <div className="font-regular mb-[8rem] mt-[4.8rem] text-sm text-text-secondary tablet:py-[1rem] tablet:text-base">
        {article.content}
        {article.image && <Card.DetailImage src={article.image} />}
      </div>

      <div className="font-medium tablet:text-lg tablet:font-semibold">
        댓글달기
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className={`${commonInputClass} my-[1.6rem] h-[10.4rem] w-full px-[1.6rem] py-[.8rem]`}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleCommentSubmit}
          disabled={isCreatingComment}
          className="h-[3.2rem] w-[7.4rem] text-[1.4rem] tablet:h-[4.8rem] tablet:w-[18.4rem] tablet:text-[1.6rem]"
        >
          등록
        </Button>
      </div>

      <Card.Divider className="my-[3.2rem] tablet:my-[4rem]" />

      <div ref={commentSectionRef} className="flex flex-col gap-[1.6rem]">
        {commentsList && commentsList.length > 0 ? (
          commentsList.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
              articleId={article.id}
            />
          ))
        ) : (
          <div className="py-[4rem] text-center text-sm font-medium text-text-default tablet:py-[8rem] tablet:text-base">
            아직 작성된 댓글이 없습니다.
          </div>
        )}

        {hasNextPage && (
          <div className="text-center">
            <button
              type="button"
              onClick={handleLoadMoreComments}
              disabled={isFetchingNextPage}
              className="p-4 text-sm text-text-secondary tablet:text-base"
            >
              + 댓글 더보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
