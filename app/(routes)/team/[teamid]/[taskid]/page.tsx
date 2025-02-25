'use client';

import TaskComment from '@/_components/taskdetail/TaskComment';
import Image from 'next/image';
import CloseBtn from '@icons/x.svg';
import TaskArticle from '@/_components/taskdetail/TaskArticle';
import TaskCommentInput from '@/_components/taskdetail/TaskCommentInput';
import { useParams, useRouter } from 'next/navigation';
import { useTask } from '@/_hooks/useTask';
import TaskDoneBtn from '@/_components/taskdetail/TaskDoneBtn';

export default function TaskDetailPage() {
  const { taskid, teamid } = useParams();
  const router = useRouter();
  const taskId = Number(taskid);
  const teamId = Number(teamid);

  const { useGetTaskById } = useTask(teamId, 0);
  const { data: task, isLoading } = useGetTaskById(taskId);

  if (!taskId) return null;
  if (isLoading) return <p></p>;
  if (!task) return <p></p>;

  return (
    <div className="h-screen max-h-screen overflow-y-auto border-[0.1rem] border-solid border-border-primary bg-background-secondary">
      <div className="relative p-[4rem]">
        <button
          className="relative"
          onClick={() => router.push(`/team/${teamId}/tasklist`)}
        >
          <Image
            src={CloseBtn}
            alt="닫기 버튼"
            width={24}
            height={24}
            className="mb-[1.2rem]"
          />
        </button>
        <div className="relative flex flex-col gap-[1.6rem]">
          <div className="mb-[10rem]">
            <TaskArticle
              task={task}
              taskId={taskId}
              teamId={String(teamId)}
              user={task.writer}
            />
          </div>
          <div>
            <TaskCommentInput taskId={taskId} />
          </div>
          <div>
            <TaskComment />
          </div>
        </div>
        <div className="fixed bottom-[4rem] right-[4rem]">
          <TaskDoneBtn taskId={taskId} teamId={teamId} doneAt={task.doneAt} />
        </div>
      </div>
    </div>
  );
}
