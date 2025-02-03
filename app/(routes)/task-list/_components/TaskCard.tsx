'use client';

import Image from 'next/image';
import Dropdown from '@/_components/common/Dropdown';

import { formatDate } from '@/_lib/utils/format-date';

const TaskCard = (/*currentListId, today*/) => {
  const mockTaskData = {
    doneBy: {
      user: {
        image: '/profile1.jpg',
        nickname: '김코딩',
        id: 1,
      },
    },
    writer: {
      image: '/profile2.jpg',
      nickname: '박해커',
      id: 2,
    },
    displayIndex: 1,
    commentCount: 5,
    deletedAt: null,
    recurringId: 101,
    frequency: '매일 반복',
    updatedAt: '2024-11-11T10:00:00.000Z',
    doneAt: '2024-01-21T09:30:00.000Z',
    date: '2024-01-21T00:00:00.000Z',
    description: '팀 회의 준비 자료 작성하기',
    name: '팀 회의 준비',
    id: 1001,
  };

  const formattedDate = formatDate(mockTaskData.updatedAt, 'YYYY년 M월 D일');

  return (
    <article
      aria-label="할 일 카드"
      className="mb-[1.2rem] flex h-[7.4rem] w-full flex-col justify-between rounded-[0.8rem] bg-background-secondary px-[1.4rem] py-[1.2rem] transition-colors duration-300 hover:bg-background-tertiary"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="할 일 완료 버튼"
            className="mr-[0.8rem]"
          >
            <Image
              src="/icons/checkbox-default.svg"
              alt="할 일 완료 버튼"
              width={24}
              height={24}
            />
          </button>
          <h2 className="mr-[1.2rem] text-sm text-text-primary">
            {mockTaskData.name}
          </h2>
          <div className="flex items-center gap-1">
            <Image src="/icons/comment.svg" alt="" width={16} height={16} />
            <span className="text-[1.2rem] text-text-default">
              {mockTaskData.commentCount}
            </span>
          </div>
        </div>
        <Dropdown>
          {({ isOpen, toggleDropdown }) => (
            <>
              <Dropdown.Button onClick={toggleDropdown}>
                <Image
                  src="/icons/kebab-small-button.svg"
                  alt="더보기 아이콘"
                  width={16}
                  height={16}
                />
              </Dropdown.Button>
              <Dropdown.Menu isOpen={isOpen}>
                <Dropdown.Item toggleDropdown={toggleDropdown}>
                  수정하기
                </Dropdown.Item>
                <Dropdown.Item toggleDropdown={toggleDropdown}>
                  삭제하기
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </div>
      <div className="flex items-center gap-[1rem] text-[1.2rem] text-text-default">
        <div className="flex items-center gap-2">
          <Image src="/icons/icon_calendar.svg" alt="" width={16} height={16} />
          <time>{formattedDate}</time>
        </div>
        <span>|</span>
        <div className="flex items-center gap-2">
          <Image src="/icons/icon_repeat.svg" alt="" width={16} height={16} />
          <span className="text-[1.2rem]">{mockTaskData.frequency}</span>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
