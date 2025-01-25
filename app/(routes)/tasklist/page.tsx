import DateSelector from './_components/DateSelector';
import TaskCard from './_components/TaskCard';

const TaskListPage = () => {
  return (
    <div className="h-screen bg-background-primary px-[3.2rem] py-[2.4rem] pc:px-[16vw]">
      <div className="mb-[1.6rem]">
        <DateSelector />
      </div>
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default TaskListPage;
