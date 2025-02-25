'use client';

import TaskCard, { Task } from './TaskCard';

interface TaskList {
  id: number;
  name: string;
}

interface TaskSectionProps {
  taskLists: TaskList[];
  selectedTaskList: number | null;
  onSelectTaskList: (id: number) => void;
  tasks: Task[];
  teamId: string;
}

export default function TaskSection({
  taskLists,
  selectedTaskList,
  onSelectTaskList,
  tasks,
  teamId,
}: TaskSectionProps) {
  const hasTaskLists = taskLists.length > 0;

  return (
    <div>
      <div>
        {!hasTaskLists ? (
          <p className="mt-[36rem] text-center text-[1.4rem] font-medium text-text-default">
            아직 할 일 목록이 없습니다.
            <br />
            새로운 목록을 추가해주세요.
          </p>
        ) : (
          <div className="flex gap-[1.2rem]">
            {taskLists.map((task) => (
              <button
                key={task.id}
                onClick={() => onSelectTaskList(task.id)}
                className={`inline-block text-[1.6rem] font-medium ${
                  selectedTaskList === task.id
                    ? 'border-b border-[#FFFFFF] text-text-tertiary'
                    : 'text-text-default'
                }`}
              >
                {task.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {hasTaskLists && (
        <div className="mt-[1.6rem] flex flex-col gap-[1.6rem]">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                taskId={task.id}
                teamId={teamId}
              />
            ))
          ) : (
            <p className="mt-[36rem] text-center text-[1.4rem] font-medium text-text-default">
              아직 할 일이 없습니다.
              <br />할 일을 추가해보세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
