import Button from '../common/Button';
import { useTask } from '@/_hooks/useTask';

interface TaskDoneBtnProps {
  taskId: number;
  teamId: number;
  doneAt?: string | null;
}

export default function TaskDoneBtn({
  taskId,
  teamId,
  doneAt,
}: TaskDoneBtnProps) {
  const isDone = !!doneAt;
  const { useUpdateTask } = useTask(teamId, 0);

  const handleCompleteTask = () => {
    useUpdateTask.mutate(
      { taskId, payload: { done: !isDone } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

  return (
    <div>
      {isDone ? (
        <Button
          round="full"
          size="medium"
          variant="outlined"
          onClick={handleCompleteTask}
          className="w-[13.8rem] text-[1.4rem] font-semibold text-brand-primary"
        >
          완료 취소하기
        </Button>
      ) : (
        <Button
          round="full"
          size="medium"
          variant="default"
          onClick={handleCompleteTask}
          className="w-[13.8rem] text-[1.4rem] font-semibold text-text-primary"
        >
          완료하기
        </Button>
      )}
    </div>
  );
}
