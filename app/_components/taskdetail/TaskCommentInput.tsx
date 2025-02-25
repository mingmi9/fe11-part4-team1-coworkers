'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import EnterDefault from '@icons/ic_enter_default.svg';
import EnterActive from '@icons/ic_enter_active.svg';
import { useComment } from '@/_hooks/useComment';

interface TaskCommentInputProps {
  taskId: number;
}

export default function TaskCommentInput({ taskId }: TaskCommentInputProps) {
  const [comment, setComment] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { useCreateComment } = useComment(taskId);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = '5rem';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = () => {
    if (!comment.trim()) return;

    useCreateComment.mutate(
      { content: comment.trim() },
      {
        onSuccess: () => {
          setComment('');
          if (textareaRef.current) {
            textareaRef.current.style.height = '5rem';
          }
          window.location.reload();
        },
      },
    );
  };

  return (
    <div>
      <div className="flex w-full border-[0.1rem] border-solid border-border-primary"></div>
      <div className="relative flex flex-row">
        <textarea
          ref={textareaRef}
          value={comment}
          onChange={handleChange}
          placeholder="댓글을 달아주세요"
          className="h-[5rem] w-full resize-none overflow-y-auto bg-inherit py-[1.3rem] pr-[3.4rem] text-[1.4rem] font-normal text-text-primary placeholder:text-text-default focus:outline-none"
          style={{
            whiteSpace: 'pre-wrap',
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          className="absolute right-0 top-[1.3rem] ml-[0.8rem]"
        >
          <Image
            src={comment.trim() ? EnterActive : EnterDefault}
            alt="댓글 전송 버튼"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex w-full border-[0.1rem] border-solid border-border-primary"></div>
    </div>
  );
}
