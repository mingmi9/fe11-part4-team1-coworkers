import TodoListCard from "./TodoListCard";


interface TodoListSectionProps {
    tasks: {
        taskList: string;
        taskTodo: number;
        taskCompleted: number;
    }[];
    }

export default function TodoListSection({tasks} : TodoListSectionProps) {
  return (
    <div>
        <div className="text-text-primary text-[1.6rem] mb-[1.6rem]">
            할 일 목록 <span className="text-text-default">({tasks.length}개)</span>
        </div>
        <div className="flex flex-col gap-[1.6rem]">
        {tasks.map(( tasks, index ) => (
            <TodoListCard
            key={index} // 고유 ID로 key 지정
            taskList={tasks.taskList}
            taskTodo={tasks.taskTodo}
            taskCompleted={tasks.taskCompleted}
            />
        ))}
        </div>
    </div>
  );
}
