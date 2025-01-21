'use client';

import MemberSection from "@/_components/TeamPage/MemberSection";
import TodoListSection from "@/_components/TeamPage/TodoListSection";
import { useParams } from "next/navigation";

const mockData = [
    {
        profileImg: "",
        name: "코드잇",
        email: "codeit@example.com",
    },
    {
        profileImg: "",
        name: "코드잇2",
        email: "codeit2@example.com",
    },
    {
        profileImg: "",
        name: "코드잇3",
        email: "codeit3@example.com",
    },
    {
        profileImg: "",
        name: "코드잇4",
        email: "codeit4@example.com",
    },
    {
        profileImg: "",
        name: "코드잇5",
        email: "codeit5@example.com",
    },
    {
        profileImg: "",
        name: "코드잇6",
        email: "codeit6@example.com",
    },

    
]; // 임시 mockData

const taskMockData = [
    {
        taskList: "프로젝트 기획",
        taskTodo: 5,
        taskCompleted: 3,
    },
    {
        taskList: "프로젝트 디자인",
        taskTodo: 5,
        taskCompleted: 2,
    },
    {
        taskList: "프로젝트 개발",
        taskTodo: 5,
        taskCompleted: 1,
    },
    {
        taskList: "프로젝트 테스트",
        taskTodo: 5,
        taskCompleted: 0,
    },
    {
        taskList: "프로젝트 배포",
        taskTodo: 5,
        taskCompleted: 5,
    },
]

export default function TeamPage () {
    const {teamid} = useParams();
    return(
        <div className="bg-background-primary">
            <MemberSection member={mockData}/>
            <div className="text-white">
                {teamid} {/*테스트용*/}
            </div>
            <TodoListSection tasks={taskMockData}/>
        </div>
    )
}