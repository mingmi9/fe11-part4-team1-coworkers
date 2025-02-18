'use client';
import { useState } from 'react';
import MenuDropdown from './MenuDropdown';
import { Comment } from '@/(routes)/boards/type/Boards';
import Card from './Card';
import { useAuthStore } from '@/_store/auth-store';
import Button from '../common/Button';

export interface CommentCardProps {
  comment: Comment;
  onUpdateComment: (commentId: number, newContent: string) => void;
  onDeleteComment: (commentId: number) => void;
}

const CommentCard = ({
  comment,
  onUpdateComment,
  onDeleteComment,
}: CommentCardProps) => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);

  // 메뉴
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    if (newContent !== comment.content) {
      onUpdateComment(comment.id, newContent);
    }
    setIsEditing(false);
  };
  const handleCancel = () => {
    setNewContent(comment.content);
    setIsEditing(false);
  };
  const handleDelete = () => {
    onDeleteComment(comment.id);
  };

  return (
    <div className="relative w-full cursor-default rounded-[.8rem] bg-background-secondary p-[1.6rem] tablet:px-[2rem] tablet:py-[2.4rem]">
      <div className="flex items-start justify-between">
        {isEditing ? (
          <div className="flex w-full flex-col items-end">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="my-[1.6rem] h-[10.4rem] w-full rounded-[1.2rem] border border-background-tertiary bg-background-secondary px-[1.6rem] py-[.8rem] text-sm placeholder-[#9CA3AF] focus:outline-none tablet:text-base"
            />
            <div className="flex gap-[.4rem]">
              <Button size="small" variant="default" onClick={handleSave}>
                저장
              </Button>
              <Button size="small" variant="secondary" onClick={handleCancel}>
                취소
              </Button>
            </div>
          </div>
        ) : (
          <Card.CommentText>{comment.content}</Card.CommentText>
        )}

        {/* 메뉴 */}
        {user?.id === comment.writer.id && (
          <MenuDropdown onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <div className="mt-[3.2rem] flex items-center justify-between">
        <div className="flex">
          {/* 프로필 */}
          <Card.Profile nickname={comment.writer.nickname} />

          {/* 날짜 */}
          <div className="flex items-center">
            <Card.DateDivider />
            <Card.Date date={comment.createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
