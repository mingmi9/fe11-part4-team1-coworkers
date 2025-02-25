'use client';

import { useState } from 'react';
import DeleteTaskModal from '../modal/DeleteTaskModal';
import { Task } from '../tasklist/TaskCard';
import { formatDate } from '@/_lib/utils/format-date';
import MenuButton from '@icons/kebab-small-button.svg';
import CalendarIcon from '@icons/icon_calendar.svg';
import RepeatIcon from '@icons/icon_repeat.svg';
import Image from 'next/image';
import Dropdown from '../common/Dropdown';
import { User } from '@/_store/user-store';
import DefaultProfile from '@icons/member.svg';
import CheckIcon from '@icons/check.svg';

interface TaskArticleProps {
  task: Task;
  taskId: number;
  teamId: string;
  user: User;
}

export default function TaskArticle({
  task,
  taskId,
  teamId,
  user,
}: TaskArticleProps) {
  const isDone = !!task.doneAt;
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const formattedDate = formatDate(task.date, 'YYYY년 M월 D일');

  const FREQUENCY_MAP: Record<string, string> = {
    DAILY: '매일 반복',
    WEEKLY: '주 반복',
    MONTHLY: '월 반복',
    ONCE: '한 번',
    NONE: '반복 안함',
  };

  const formattedFrequency = FREQUENCY_MAP[task.frequency] || '반복 안함';

  return (
    <div className="flex items-center justify-center">
      <div className="min-h-[7.4rem] rounded-[0.8rem] bg-background-secondary mobile:w-full tablet:w-full pc:w-[120rem]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-[1.2rem]">
            <div className="flex flex-col items-start gap-[0.8rem]">
              {isDone && (
                <div className="flex flex-row gap-[0.8rem]">
                  <Image
                    src={CheckIcon}
                    alt="체크 아이콘"
                    width={16}
                    height={16}
                  />
                  <span className="text-[1.2rem] font-medium text-brand-primary">
                    완료
                  </span>
                </div>
              )}
              <p
                className={`text-[2rem] font-bold text-text-primary ${isDone ? 'line-through' : ''}`}
              >
                {task.name}
              </p>
            </div>
          </div>
          <Dropdown>
            {({ isOpen, toggleDropdown }) => (
              <div>
                <Dropdown.Button onClick={toggleDropdown}>
                  <Image
                    src={MenuButton}
                    alt="메뉴 버튼"
                    width={24}
                    height={24}
                    className="object-contain hover:brightness-150"
                  />
                </Dropdown.Button>
                <Dropdown.Menu
                  isOpen={isOpen}
                  boxClass="rounded-[1.2rem] border-[.1rem] right-0 w-[12rem] border-background-tertiary"
                  contClass="text-[1.4rem] font-normal"
                >
                  <Dropdown.Item
                    toggleDropdown={toggleDropdown}
                    className="justify-center"
                  >
                    수정하기
                  </Dropdown.Item>
                  <Dropdown.Item
                    toggleDropdown={toggleDropdown}
                    onClick={() => setIsOpenDeleteModal(true)}
                    className="justify-center"
                  >
                    삭제하기
                  </Dropdown.Item>
                </Dropdown.Menu>
              </div>
            )}
          </Dropdown>
        </div>
        <div className="mt-[1.6rem] flex flex-row items-center gap-[1.2rem]">
          <Image
            src={user.image || DefaultProfile}
            alt="프로필 사진"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-[1.4rem] font-medium text-text-primary">
            {user.nickname}
          </span>
        </div>
        <div className="mt-[1.6rem] flex flex-row items-center gap-[1rem]">
          <div className="flex flex-row items-center gap-[0.6rem]">
            <Image
              src={CalendarIcon}
              alt="캘린더 아이콘"
              width={16}
              height={16}
            />
            <time className="text-[1.2rem] font-normal text-text-default">
              {formattedDate}
            </time>
          </div>
          <div className="h-[0.8rem] border-[0.1rem] border-slate-700"></div>
          <div className="flex flex-row items-center gap-[0.6rem]">
            <Image src={RepeatIcon} alt="반복 아이콘" width={16} height={16} />
            <span className="text-[1.2rem] font-normal text-text-default">
              {formattedFrequency}
            </span>
          </div>
        </div>

        <p className="mt-[1.6rem] text-[1.4rem] font-normal text-text-primary">
          {task.description}
        </p>

        <DeleteTaskModal
          isOpenModal={isOpenDeleteModal}
          handleCloseModal={() => setIsOpenDeleteModal(false)}
          taskName={task.name}
          taskId={taskId}
          teamId={teamId}
        />
      </div>
    </div>
  );
}
