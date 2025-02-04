import DateSelector from '@/(routes)/task-list/_components/DateSelector';
import TaskListNav from '@/(routes)/task-list/_components/TaskListNav';
import TaskSection from '@/(routes)/task-list/_components/TaskSection';

interface TaskListPageProps {
  params: {
    groupId: string;
    listId: string;
  };
  searchParams: {
    date: string;
  };
}

const TaskListPage = ({ params, searchParams }: TaskListPageProps) => {
  const currentGroupId = Number(params.groupId);
  const currentListId = Number(params.listId);
  const currentDate = new Date(searchParams.date);

  return (
    <div className="h-screen bg-background-primary px-[3.2rem] py-[2.4rem] pc:px-[16vw]">
      <div className="mb-[1.6rem] flex flex-col gap-[1.6rem]">
        <DateSelector />
        <TaskListNav />
      </div>
      <TaskSection
        currentGroupId={currentGroupId}
        currentDate={currentDate}
        currentListId={currentListId}
      />
    </div>
  );
};

export default TaskListPage;
