'use client';

import clsx from 'clsx';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

const TaskListNav = (/*currentListId, today*/) => {
  // const [current, setCurrent] = useState<number>(currentListId);
  // const router = useRouter();
  // api로 받아올 list data
  const taskList = [
    {
      displayIndex: 0,
      groupId: 123,
      updatedAt: '2025-01-25T05:39:30.958Z',
      createdAt: '2025-01-25T05:39:30.958Z',
      name: '면접',
      id: 1,
      tasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
    },
    {
      displayIndex: 1,
      groupId: 123,
      updatedAt: '2025-01-25T05:39:30.958Z',
      createdAt: '2025-01-25T05:39:30.958Z',
      name: '코딩테스트',
      id: 2,
      tasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
    },
    {
      displayIndex: 2,
      groupId: 123,
      updatedAt: '2025-01-25T05:39:30.958Z',
      createdAt: '2025-01-25T05:39:30.958Z',
      name: '청소',
      id: 3,
      tasks: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
    },
  ];

  const current = 2;

  return (
    <nav className="flex gap-[1.2rem]">
      {taskList.map((taskList) => (
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
