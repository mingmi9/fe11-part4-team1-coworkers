'use client';

import clsx from 'clsx';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
import { useTaskList } from '@/_hooks/useTaskList';

interface TaskListNavProps {
  currentTeamId: number;
  currentListId: number;
  currentDate: Date;
}

interface TaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: {
    doneBy: {
      user: {
        image: string;
        nickname: string;
        id: number;
      };
    };
    writer: {
      image: string;
      nickname: string;
      id: number;
    };
    displayIndex: number;
    commentCount: number;
    deletedAt: string | null;
    recurringId: number;
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
    updatedAt: string;
    doneAt: string;
    date: string;
    description: string;
    name: string;
    id: number;
  }[];
}

const TaskListNav = ({
  currentTeamId,
  currentListId,
  currentDate,
}: TaskListNavProps) => {
  // const [current, setCurrent] = useState<number>(currentListId);
  // const router = useRouter();

  const { data: taskList } = useTaskList(
    currentTeamId,
    currentListId,
    currentDate,
  ).useGetTaskList;
  // const taskList = [
  //   {
  //     displayIndex: 0,
  //     groupId: 123,

  //     updatedAt: '2025-01-25T05:39:30.958Z',
  //     createdAt: '2025-01-25T05:39:30.958Z',
  //     name: '면접',
  //     id: 1,
  //     tasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
  //   },
  //   {
  //     displayIndex: 1,
  //     groupId: 123,
  //     updatedAt: '2025-01-25T05:39:30.958Z',
  //     createdAt: '2025-01-25T05:39:30.958Z',
  //     name: '코딩테스트',
  //     id: 2,
  //     tasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
  //   },
  //   {
  //     displayIndex: 2,
  //     groupId: 123,
  //     updatedAt: '2025-01-25T05:39:30.958Z',
  //     createdAt: '2025-01-25T05:39:30.958Z',
  //     name: '청소',
  //     id: 3,
  //     tasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
  //   },
  // ];

  const current = 2;

  return (
    <nav className="flex gap-[1.2rem]">
      {taskList.map((taskList: TaskList) => (
        <button
          key={taskList.id}
          type="button"
          // onClick={() => {
          // setCurrent(taskList.id);
          // router.push(
          //   `team/${currentTeamId}/task-list/${taskList.id}?date=${today}`,

          // );
          // }
          className={clsx(
            'text-16-500 h-full whitespace-nowrap',
            current === taskList.id
              ? 'border-b border-text-tertiary text-text-tertiary'
              : 'text-text-default',
          )}
        >
          {taskList.name}
        </button>
      ))}
    </nav>
  );
};

export default TaskListNav;
