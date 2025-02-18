'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/_store/auth-store';
import { useArticle } from '@/_hooks/useArticle';
import { useArticleComment } from '@/_hooks/useArticleComment';
import { Comment } from '../type/Boards';
import Card from '@/_components/boards/Card';
import Button from '@/_components/common/Button';
import CommentCard from '@/_components/boards/CommentCard';
import MenuDropdown from '@/_components/boards/MenuDropdown';
import { useLike } from '@/_hooks/useLike';

const BoardDetailPage = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();
  const { id } = useParams();
  const [newComment, setNewComment] = useState<string>('');
  const commentSectionRef = useRef<HTMLDivElement | null>(null);

  const { useGetArticlesById, useDeleteArticle } = useArticle();
  const {
    useGetArticleComment,
    useCreateArticleComment,
    useUpdateArticleComment,
    useDeleteArticleComment,
  } = useArticleComment();

  // 게시글 상세 조회
  const { data: article, isLoading, isError } = useGetArticlesById(Number(id));

  // 게시글 수정
  const handleEdit = () => {
    router.push(`/boards/${id}/edit`);
  };

  // 게시글 삭제
  const { mutate: deleteArticle, isPending: isDeleteArticlePending } =
    useDeleteArticle;

  const handleDelete = () => {
    if (!id) {
      return;
    }

    deleteArticle(Number(id), {
      onSuccess: () => {
        alert('게시글이 삭제되었습니다.');
        router.push('/boards');
      },
      onError: (error: Error) => {
        console.error('게시글 삭제 실패:', error);
        alert('게시글 삭제에 실패했습니다.');
      },
    });
  };

  // 댓글 조회
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isPending: isCreatingComment,
  } = useGetArticleComment(Number(id), {
    limit: 10,
    cursor: 0,
  });

  // 댓글 작성
  const { mutate: createComment } = useCreateArticleComment;

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
      { articleId: Number(id), content: newComment },
      {
        onSuccess: () => {
          setNewComment('');
          alert('댓글이 등록되었습니다.');
        },
        onError: () => {
          alert('댓글 등록에 실패했습니다.');
        },
      },
    );
  };

  // 댓글 수정
  const { mutate: updateComment } = useUpdateArticleComment;

  const handleUpdateComment = async (commentId: number, newContent: string) => {
    updateComment(
      { commentId, content: newContent },
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

  const handleDeleteComment = async (commentId: number) => {
    deleteComment(commentId, {
      onSuccess: () => {
        alert('댓글이 삭제되었습니다.');
      },
      onError: (error) => {
        console.error('댓글 삭제 실패:', error);
        alert('댓글 삭제에 실패했습니다.');
      },
    });
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
      console.error('error', error);
      setLikeState((prev) => ({
        liked: !newLikedState,
        likeCount: newLikedState ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    }
  };

  // 로딩 및 오류
  if (isLoading || !article) {
    return <div>Loading...</div>;
  }

  if (isError || !article) {
    alert('다시 시도해 주세요.');
    router.push('/');
  }

  if (isCommentsLoading || isDeleteArticlePending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-[6.4rem] tablet:py-[8rem]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-text-secondary tablet:text-lg">
          {article.title}
        </h3>
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
      <p className="font-regular mb-[8rem] mt-[4.8rem] text-sm text-text-secondary tablet:py-[1rem] tablet:text-base">
        {article.content}
      </p>
      {article.image && <Card.DetailImage src={article.image} />}

      <h2 className="font-medium tablet:text-lg tablet:font-semibold">
        댓글달기
      </h2>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력해주세요."
        className="my-[1.6rem] h-[10.4rem] w-full rounded-[1.2rem] border border-background-tertiary bg-background-secondary px-[1.6rem] py-[.8rem] text-sm placeholder-[#9CA3AF] focus:outline-none tablet:text-base"
      />
      <div className="flex justify-end">
        <Button
          onClick={handleCommentSubmit}
          className="h-[3.2rem] w-[7.4rem] text-[1.4rem] tablet:h-[4.8rem] tablet:w-[18.4rem] tablet:text-[1.6rem]"
        >
          {isCreatingComment ? '...' : '등록'}
        </Button>
      </div>

      <Card.Divider className="my-[3.2rem] tablet:my-[4rem]" />

      <div ref={commentSectionRef} className="flex flex-col gap-[1.6rem]">
        {comments?.list && comments.list.length > 0 ? (
          comments.list.map((comment: Comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />
          ))
        ) : (
          <div className="py-[4rem] text-center text-sm font-medium text-text-default tablet:py-[8rem] tablet:text-base">
            아직 작성된 댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetailPage;
