import DateSelector from '@/(routes)/task-list/_components/DateSelector';
import TaskCard from '@/(routes)/task-list/_components/TaskCard';
import TaskListNav from '@/(routes)/task-list/_components/TaskListNav';

const TaskListPage = () => {
  return (
    <div className="h-screen bg-background-primary px-[3.2rem] py-[2.4rem] pc:px-[16vw]">
      <div className="mb-[1.6rem]">
        <DateSelector />
      </div>
      <div className="mb-[1.6rem]">
        <TaskListNav />
      </div>
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default TaskListPage;
