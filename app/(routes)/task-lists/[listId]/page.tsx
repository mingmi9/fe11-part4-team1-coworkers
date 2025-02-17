import TaskDateSelector from '@/(routes)/task-lists/[listId]/_components/TaskDateSelector';
import TaskListNav from '@/(routes)/task-lists/[listId]/_components/TaskListNav';
import TaskSection from '@/(routes)/task-lists/[listId]/_components/TaskSection';
import Button from '@/_components/common/Button';
import AddTaskListModal from '@/_components/modal/AddTaskListModal';
import AddTaskModal from '@/_components/modal/AddTaskModal';
import { useState } from 'react';

interface TaskListPageProps {
  params: {
    teamId: string;
    listId: string;
  };

  searchParams: {
    date: string;
  };
}

const TaskListPage = ({ params, searchParams }: TaskListPageProps) => {
  // 기존 teamid였던 경로를 teamId로 변경해야 함
  const currentTeamId = Number(params.teamId);
  const currentListId = Number(params.listId);
  const currentDate = new Date(searchParams.date);

  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false);

  const [isOpenAddTaskListModal, setIsOpenAddTaskListModal] = useState(false);

  return (
    <div className="h-screen bg-background-primary px-[3.2rem] py-[2.4rem] pc:px-[16vw]">
      <div className="mb-[1.6rem] flex flex-col gap-[1.6rem]">
        <div className="flex items-center justify-between">
          <TaskDateSelector currentDate={currentDate} />
          <button onClick={() => setIsOpenAddTaskListModal(true)}>
            <span className="text-brand-primary">+ 새로운 목록 추가하기</span>
          </button>
        </div>
        <TaskListNav />
      </div>

      <TaskSection
        currentTeamId={currentTeamId}
        currentDate={currentDate}
        currentListId={currentListId}
      />

      <Button
        size="modal-medium"
        round="xl"
        className="mb-[3.2rem]"
        onClick={() => setIsOpenAddTaskModal(true)}
      >
        할 일 추가
      </Button>

      {/* 모달들 */}
      <AddTaskModal
        isOpenModal={isOpenAddTaskModal}
        handleCloseModal={() => setIsOpenAddTaskModal(false)}
      />
      <AddTaskListModal
        isOpenModal={isOpenAddTaskListModal}
        handleCloseModal={() => setIsOpenAddTaskListModal(false)}
      />
    </div>
  );
};

export default TaskListPage;
