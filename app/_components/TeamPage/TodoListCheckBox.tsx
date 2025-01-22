import Image from 'next/image';
import ongoing from "@icons/progress-ongoing.svg";
import done from "@icons/progress-done.svg";

interface TodoListCheckBoxProps {
    taskTodo: number;
    taskCompleted: number;
}

export default function TodoListCheckBox({taskTodo, taskCompleted}: TodoListCheckBoxProps) {

    let checkImg = ongoing;
    if(taskCompleted / taskTodo >= 1){
        checkImg = done;
    }

    return (
    <div className= "bg-background-primary text-brand-primary rounded-[1.2rem] py-[0.4rem] px-[0.8rem] flex gap-[0.4rem]">
        <Image src={checkImg} width={16} height={16} alt="할일그래프" /> {taskCompleted} / {taskTodo}
    </div>
    );
}