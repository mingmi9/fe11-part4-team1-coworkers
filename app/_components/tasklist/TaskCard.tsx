'use client';

import Image from 'next/image';
import ActiveCheck from '@icons/checkbox-active.svg';
import DefaultCheck from '@icons/checkbox-default.svg';
import CommentIcon from '@icons/comment.svg';
import MenuButton from '@icons/kebab-small-button.svg';
import { useState } from 'react';
import Dropdown from '../common/Dropdown';
import DeleteTaskModal from '../modal/DeleteTaskModal';
import CalendarIcon from '@icons/icon_calendar.svg';
import { formatDate } from '@/_lib/utils/format-date';
import RepeatIcon from '@icons/icon_repeat.svg';
import { User } from '@/_store/user-store';
import { useRouter } from 'next/navigation';

export interface Task {
  commentCount: number;
  frequency: string;
  date: string;
  name: string;
  id: number;
  doneAt?: string;
  image?: string;
  description?: string;
  writer?: User;
  doneBy?: {
    user: User;
  };
}

interface TaskCardProps {
  task: Task;
  taskId: number;
  teamId: string;
}

export default function TaskCard({ task, taskId, teamId }: TaskCardProps) {
  const [isCheck, setIsCheck] = useState(!!task.doneAt);
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

  const router = useRouter();

  const handleSelectTask = (taskId: number) => {
    router.push(`/team/${teamId}/${taskId}`, { scroll: false });
  };

  const toggleCheck = () => {
    setIsCheck((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="h-[7.4rem] rounded-[0.8rem] bg-background-secondary px-[1.4rem] py-[1.2rem] mobile:w-full tablet:w-full pc:w-[120rem]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-[1.2rem]">
            <div className="flex flex-row items-center gap-[0.8rem]">
              {isCheck ? (
                <button onClick={toggleCheck}>
                  <Image
                    src={ActiveCheck}
                    alt="체크 활성화"
                    width={24}
                    height={24}
                  />
                </button>
              ) : (
                <button onClick={toggleCheck}>
                  <Image
                    src={DefaultCheck}
                    alt="체크 비활성화"
                    width={24}
                    height={24}
                  />
                </button>
              )}
              <button onClick={() => handleSelectTask(task.id)}>
                <p
                  className={`text-[1.4rem] font-normal text-text-primary ${isCheck ? 'line-through' : ''}`}
                >
                  {task.name}
                </p>
              </button>
            </div>
            <div className="flex flex-row items-center gap-[0.2rem]">
              <Image
                src={CommentIcon}
                alt="댓글 아이콘"
                width={16}
                height={16}
              />
              <span className="text-[1.2rem] font-normal text-text-default">
                {task.commentCount}
              </span>
            </div>
          </div>
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
        <div className="mt-[1rem] flex flex-row items-center gap-[1rem]">
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
