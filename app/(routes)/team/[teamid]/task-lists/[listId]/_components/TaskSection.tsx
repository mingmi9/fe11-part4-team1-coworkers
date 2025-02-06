'use client';

import { useTaskList } from '@/_hooks/useTaskList';
import TaskCard from '@/(routes)/team/[teamid]/task-lists/[listId]/_components/TaskCard';

interface Task {
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
  deletedAt: string;
  recurringId: number;
  frequency: string;
  updatedAt: string;
  doneAt: string;
  date: string;
  description: string;
  name: string;
  id: number;
}

interface TasksProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
}

const TasksSection = ({
  currentTeamId,
  currentDate,
  currentListId,
}: TasksProps) => {
  // const stringCurrentDate = currentDate.toISOString();
  // useTaskList 훅에서 할 일 목록 조회용 훅(useGetTaskList) 사용
  const { useGetTaskList } = useTaskList(
    currentTeamId,
    currentListId,
    currentDate,
  );

  const { data: taskList } = useGetTaskList;

  if (!taskList) throw new Error('TaskList Data를 불러올 수 없습니다.');
  if (taskList.length === 0) return null;

  return (
    <section className="mb-16 flex flex-col gap-16">
      {taskList.map((task: Task) => (
        <TaskCard
          key={task.id}
          // id={task.id}
          // recurringId={task.recurringId.toString()}
          // frequency={task.frequency}
          // date={stringCurrentDate}
        />
      ))}
    </section>
  );
};

export default TasksSection;
