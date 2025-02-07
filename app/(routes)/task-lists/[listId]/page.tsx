import TaskDateSelector from '@/(routes)/task-lists/[listId]/_components/TaskDateSelector';
import TaskListNav from '@/(routes)/task-lists/[listId]/_components/TaskListNav';
import TaskSection from '@/(routes)/task-lists/[listId]/_components/TaskSection';
import Button from '@/_components/common/Button';
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

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div className="h-screen bg-background-primary px-[3.2rem] py-[2.4rem] pc:px-[16vw]">
      <div className="mb-[1.6rem] flex flex-col gap-[1.6rem]">
        <TaskDateSelector
          currentDate={currentDate}
          currentTeamId={currentTeamId}
        />
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
        onClick={handleOpenModal}
      >
        할 일 추가
      </Button>
      <AddTaskModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default TaskListPage;
