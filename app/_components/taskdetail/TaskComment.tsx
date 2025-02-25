'use client';

import Image from 'next/image';
import { useState } from 'react';
import Dropdown from '../common/Dropdown';
import MenuButton from '@icons/kebab-small-button.svg';
import DefaultProfile from '@icons/member.svg';
import { useComment } from '@/_hooks/useComment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useParams } from 'next/navigation';

dayjs.extend(relativeTime);
dayjs.locale('ko');

interface Comment {
  id: number;
  content: string;
  user: {
    image?: string;
    nickname: string;
  };
  createdAt: string;
}

export default function TaskComment() {
  const params = useParams();
  const taskId = Number(params.taskid);

  const { useGetComments, useDeleteComment, useUpdateComment } =
    useComment(taskId);
  const { data: comments, isLoading } = useGetComments;
  const { mutate: deleteComment } = useDeleteComment;
  const { mutate: updateComment } = useUpdateComment;

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  if (isLoading) return <p></p>;

  return (
    <div className="flex flex-col gap-[1.6rem]">
      {comments?.map((comment: Comment) => (
        <div key={comment.id} className="flex flex-col gap-[1rem]">
          <div className="flex flex-row justify-between">
            {editingId === comment.id ? (
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full rounded border p-2 text-[1.4rem]"
              />
            ) : (
              <p className="text-[1.4rem] font-normal text-text-primary">
                {comment.content}
              </p>
            )}

            <Dropdown>
              {({ isOpen, toggleDropdown }) => (
                <div>
                  <Dropdown.Button onClick={toggleDropdown}>
                    <Image
                      src={MenuButton}
                      alt="메뉴 버튼"
                      width={16}
                      height={16}
                      className="object-contain hover:brightness-150"
                    />
                  </Dropdown.Button>
                  <Dropdown.Menu
                    isOpen={isOpen}
                    boxClass="rounded-[1.2rem] border-[.1rem] right-0 w-[12rem] border-background-tertiary"
                    contClass="text-[1.4rem] font-normal"
                  >
                    {editingId === comment.id ? (
                      <>
                        <Dropdown.Item
                          toggleDropdown={toggleDropdown}
                          onClick={() => {
                            updateComment({
                              commentId: Number(comment.id),
                              content: editContent,
                            });
                            setEditingId(null);
                          }}
                          className="justify-center"
                        >
                          수정 완료
                        </Dropdown.Item>
                        <Dropdown.Item
                          toggleDropdown={toggleDropdown}
                          onClick={() => setEditingId(null)}
                          className="justify-center"
                        >
                          취소
                        </Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <Dropdown.Item
                          toggleDropdown={toggleDropdown}
                          onClick={() => {
                            setEditingId(comment.id);
                            setEditContent(comment.content);
                          }}
                          className="justify-center"
                        >
                          수정하기
                        </Dropdown.Item>
                        <Dropdown.Item
                          toggleDropdown={toggleDropdown}
                          onClick={() => deleteComment(Number(comment.id))}
                          className="justify-center"
                        >
                          삭제하기
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </div>
              )}
            </Dropdown>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-[1.2rem]">
              <Image
                src={comment.user.image || DefaultProfile}
                alt="프로필 사진"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-[1.4rem] font-medium text-text-primary">
                {comment.user.nickname}
              </span>
            </div>
            <time className="text-[1.2rem] font-normal text-text-secondary">
              {dayjs(comment.createdAt).fromNow()}
            </time>
          </div>

          <div className="flex w-full border-[0.1rem] border-solid border-border-primary"></div>
        </div>
      ))}
    </div>
  );
}
