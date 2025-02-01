import Image from 'next/image';
import kebab from '@icons/kebab-small-button.svg';
import TodoListCheckBox from './TodoListCheckBox';
import { useRouter } from 'next/navigation';
import Dropdown from '../common/Dropdown';
import DeleteTaskModal from '../modal/DeleteTaskModal';
import { useState } from 'react';

interface TodoListCardProps {
  taskList: string;
  taskTodo: number;
  taskCompleted: number;
  teamId: string;
  color: string;
}

export default function TodoListCard({
  taskList,
  taskTodo,
  taskCompleted,
  teamId,
  color,
}: TodoListCardProps) {
  const router = useRouter();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleTaskList = () => {
    router.push(`/team/${teamId}/taskList`);
  };
  const handleEdit = () => {
    console.log('수정하는 함수');
  };
  const handleDelete = () => {
    setIsOpenDeleteModal(true);
  };

  return (
    <div className="relative flex h-[4rem] w-full items-center justify-between rounded-[1.2rem] bg-background-secondary pr-[0.8rem] text-[1.4rem]">
      <div className={`h-[4rem] w-[2.4rem] rounded-[1.2rem] ${color}`} />
      <div className="absolute left-[1.2rem] flex h-[4rem] items-center bg-background-secondary p-[1.2rem] text-text-primary">
        {taskList}
      </div>
      <div className="flex items-center gap-[0.4rem]">
        <TodoListCheckBox taskTodo={taskTodo} taskCompleted={taskCompleted} />
        <Dropdown>
          {({ isOpen, toggleDropdown }) => (
            <>
              <div
                className="h-[1.6rem] w-[1.6rem] flex-shrink-0 cursor-pointer"
                onClick={toggleDropdown}
              >
                <Image
                  src={kebab}
                  width={16}
                  height={16}
                  alt="케밥"
                  className="hover:brightness-150"
                />
              </div>
              <Dropdown.Menu
                isOpen={isOpen}
                boxClass="w-[10rem] top-[2rem] right-0 shadow-2xl border-[0.1rem] border-border-primary/10"
              >
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  onClick={handleTaskList}
                  className="justify-center"
                >
                  이동하기
                </Dropdown.Item>
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  onClick={handleEdit}
                  className="justify-center"
                >
                  수정하기
                </Dropdown.Item>
                <Dropdown.Item
                  toggleDropdown={toggleDropdown}
                  onClick={handleDelete}
                  className="justify-center"
                >
                  삭제하기
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
        <DeleteTaskModal
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          task={taskList}
        />
      </div>
    </div>
  );
}
