import TaskDateSelector from '@/(routes)/team/[teamid]/task-lists/[listId]/_components/TaskDateSelector';
import TaskListNav from '@/(routes)/team/[teamid]/task-lists/[listId]/_components/TaskListNav';
import TaskSection from '@/(routes)/team/[teamid]/task-lists/[listId]/_components/TaskSection';

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

  return (
    <div className="h-screen bg-background-primary px-[3.2rem] py-[2.4rem] pc:px-[16vw]">
      <div className="mb-[1.6rem] flex flex-col gap-[1.6rem]">
        <TaskDateSelector
          currentDate={currentDate}
          currentTeamId={currentTeamId}
        />
        <TaskListNav
          currentTeamId={currentTeamId}
          currentListId={currentListId}
          currentDate={currentDate}
        />
      </div>

      <TaskSection
        currentTeamId={currentTeamId}
        currentDate={currentDate}
        currentListId={currentListId}
      />
    </div>
  );
};

export default TaskListPage;
