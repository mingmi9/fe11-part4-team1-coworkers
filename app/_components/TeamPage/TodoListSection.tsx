import TodoListCard from "./TodoListCard";


interface TodoListSectionProps {
    tasks: {
        taskList: string;
        taskTodo: number;
        taskCompleted: number;
    }[],
    teamId: string;
    }

export default function TodoListSection({tasks, teamId} : TodoListSectionProps) {
  return (
    <div>
        <div className="flex justify-between mb-[1.6rem] w-[120rem]">
            <div className="text-text-primary text-[1.6rem]">
                할 일 목록 <span className="text-text-default">({tasks.length}개)</span>
            </div>
            <button className="text-brand-primary hover:brightness-150">
                + 새로운 목록 추가하기
            </button>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
        {tasks.map(( tasks, index ) => (
            <TodoListCard
            key={index}
            taskList={tasks.taskList}
            taskTodo={tasks.taskTodo}
            taskCompleted={tasks.taskCompleted}
            teamId={teamId}
            />
        ))}
        </div>
    </div>
  );
}
