import Image from 'next/image';
import kebab from "@icons/kebab-small-button.svg"
import TodoListCheckBox from "./TodoListCheckBox";

interface TodoListCardProps {
    taskList: string;
    taskTodo: number;
    taskCompleted: number;
}

export default function TodoListCard({taskList, taskTodo, taskCompleted}: TodoListCardProps) {

    const color = ["bg-point-purple", "bg-point-blue", "bg-point-cyan", "bg-point-pink", "bg-point-rose", "bg-point-orange", "bg-point-yellow"];

    const getColor = (key: string) => {
        const hash = Array.from(key).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return color[hash % color.length];
      };
    
      const assignedColor = getColor(taskList);

    return(
        <div className="w-full h-[4rem] bg-background-secondary rounded-[1.2rem] pr-[0.8rem] relative flex justify-between items-center text-[1.4rem]">
            <div className={`w-[2.4rem] h-[4rem] rounded-[1.2rem] ${assignedColor}`}/>
            <div className="h-[4rem] bg-background-secondary left-[1.2rem] text-text-primary absolute flex items-center p-[1.2rem]">
                {taskList}
            </div>
            <div className="flex gap-[0.4rem] items-center">
            <TodoListCheckBox taskTodo={taskTodo} taskCompleted={taskCompleted}/>
            <button className="w-[1.6rem] h-[1.6rem] flex-shrink-0">
                <Image src={kebab} width={16} height={16} alt="케밥" className="hover:brightness-150"/>
            </button>
            </div>
        </div>
    );

}