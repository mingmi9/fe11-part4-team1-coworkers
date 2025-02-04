'use client';

import Button from '@/_components/common/Button';
import MemberSection from '@/_components/TeamPage/MemberSection';
import ReportSection from '@/_components/TeamPage/ReportSection';
import TeamHeader from '@/_components/TeamPage/TeamHeader';
import TodoListSection from '@/_components/TeamPage/TodoListSection';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const mockData = [
  {
    profileImg: '',
    name: '코드잇',
    email: 'codeit@example.com',
  },
  {
    profileImg: '',
    name: '코드잇2',
    email: 'codeit2@example.com',
  },
  {
    profileImg: '',
    name: '코드잇3',
    email: 'codeit3@example.com',
  },
  {
    profileImg: '',
    name: '코드잇4',
    email: 'codeit4@example.com',
  },
  {
    profileImg: '',
    name: '코드잇5',
    email: 'codeit5@example.com',
  },
  {
    profileImg: '',
    name: '코드잇6',
    email: 'codeit6@example.com',
  },
]; // 임시 mockData

const taskMockData = [
  {
    taskList: '프로젝트 기획',
    taskTodo: 5,
    taskCompleted: 3,
  },
  {
    taskList: '프로젝트 디자인',
    taskTodo: 5,
    taskCompleted: 2,
  },
  {
    taskList: '프로젝트 개발',
    taskTodo: 5,
    taskCompleted: 1,
  },
  {
    taskList: '프로젝트 테스트',
    taskTodo: 5,
    taskCompleted: 0,
  },
  {
    taskList: '프로젝트 배포',
    taskTodo: 5,
    taskCompleted: 5,
  },
  {
    taskList: '프로젝트 유지보수',
    taskTodo: 5,
    taskCompleted: 5,
  },
];

const teamname = '경영관리팀';

export default function TeamPage() {
  const { teamid } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const alltasksTodo = taskMockData.reduce((acc, cur) => acc + cur.taskTodo, 0);
  const alltasksCompleted = taskMockData.reduce(
    (acc, cur) => acc + cur.taskCompleted,
    0,
  );

  return (
    <div className="mx-auto mt-[3rem] flex h-full flex-col items-center gap-[3rem] mobile:w-[34.3rem] tablet:w-[69.6rem] pc:w-[120rem]">
      <TeamHeader teamName={teamname} isAdmin={isAdmin} />
      <TodoListSection tasks={taskMockData} teamId={teamid as string} />
      {isAdmin && (
        <ReportSection
          alltasks={alltasksTodo}
          completedtasks={alltasksCompleted}
        />
      )}
      <MemberSection member={mockData} isAdmin={isAdmin} />
      <Button onClick={handleAdmin}>관리자 모드</Button>
    </div>
  );
}
