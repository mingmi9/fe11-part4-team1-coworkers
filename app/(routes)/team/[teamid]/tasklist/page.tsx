'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import CalendarIcon from '@icons/icon_calendar.svg';
import LeftArrowIcon from '@icons/arrow-left.svg';
import RightArrowIcon from '@icons/arrow-right.svg';
import TaskCalendar from '@/_components/tasklist/TaskCalendar';
import dayjs from 'dayjs';
import TaskSection from '@/_components/tasklist/TaskSection';
import { useParams } from 'next/navigation';
import { useTask } from '@/_hooks/useTask';
import AddTaskListModal from '@/_components/modal/AddTaskListModal';
import { useGroup } from '@/_hooks/useGroup';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Button from '@/_components/common/Button';
import AddTaskModal from '@/_components/modal/AddTaskModal';

dayjs.extend(customParseFormat);

export default function TaskListPage() {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTaskList, setSelectedTaskList] = useState<number | null>(null);
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false);

  const params = useParams();
  const teamId = Number(params.teamid);
  const [groupId, setGroupId] = useState<number | null>(teamId);

  useEffect(() => {
    if (params.groupid) {
      setGroupId(Number(params.groupid));
    }
  }, [params.groupid]);

  const { useGetGroupInfo } = useGroup({}, groupId ?? 0);
  const { data: groupData, isLoading: isGroupLoading } = useGetGroupInfo;

  const taskListData = useMemo(() => groupData?.taskLists ?? [], [groupData]);

  useEffect(() => {
    if (taskListData.length > 0 && selectedTaskList == null) {
      setSelectedTaskList(taskListData[0].id);
    }
  }, [taskListData, selectedTaskList]);

  const selectedTaskListId = selectedTaskList ?? taskListData?.[0]?.id;

  const { useGetTaskByDate } = useTask(teamId, selectedTaskListId);
  const { data: taskData } = useGetTaskByDate(
    selectedTaskListId ? selectedDate.format('YYYY-MM-DDTHH:mm:ssZ') : '',
  );

  const handleOpenCalendar = () => setIsOpenCalendar(true);
  const handleCloseCalendar = () => setIsOpenCalendar(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const handleSelectDate = (date: string) => {
    const parsedDate = dayjs(date, ['YYYY-MM-DD', 'M월 D일 (ddd)'], true);
    if (!parsedDate.isValid()) {
      console.error('유효하지 않은 날짜:', date);
      return;
    }
    setSelectedDate(parsedDate);
    setIsOpenCalendar(false);
  };

  const handlePrevDate = () => {
    setSelectedDate((prev) => prev.subtract(1, 'day'));
  };
  const handleNextDate = () => {
    setSelectedDate((prev) => prev.add(1, 'day'));
  };

  const handleSelectTaskList = (taskListId: number) => {
    setSelectedTaskList(taskListId);
  };

  const handleOpenAddTaskModal = () => setIsOpenAddTaskModal(true);
  const handleCloseAddTaskModal = () => setIsOpenAddTaskModal(false);

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <span className="mt-[4rem] flex text-[2rem] font-bold text-text-primary">
        할 일
      </span>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-[1.2rem]">
          <span className="text-[1.6rem] font-medium text-text-primary">
            {selectedDate.format('M월 D일 (ddd)')}
          </span>
          <div className="flex flex-row gap-[0.4rem]">
            <button
              onClick={handlePrevDate}
              className="flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-full bg-background-secondary"
            >
              <Image
                src={LeftArrowIcon}
                alt="이전 날짜 이동"
                width={12}
                height={12}
              />
            </button>
            <button
              onClick={handleNextDate}
              className="flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-full bg-background-secondary"
            >
              <Image
                src={RightArrowIcon}
                alt="다음 날짜 이동"
                width={12}
                height={12}
              />
            </button>
          </div>
          <button
            onClick={handleOpenCalendar}
            className="flex h-[2.4rem] w-[2.4rem] items-center justify-center rounded-full bg-background-secondary"
          >
            <Image
              src={CalendarIcon}
              alt="캘린더 아이콘"
              width={12}
              height={12}
            />
          </button>
          <TaskCalendar
            isOpen={isOpenCalendar}
            onClose={handleCloseCalendar}
            onDateSelect={handleSelectDate}
          />
        </div>

        <button
          onClick={handleOpenModal}
          className="text-brand-primary hover:brightness-150"
        >
          + 새로운 목록 추가하기
        </button>
      </div>
      {!isGroupLoading && taskListData ? (
        <TaskSection
          taskLists={taskListData}
          selectedTaskList={selectedTaskList}
          onSelectTaskList={handleSelectTaskList}
          tasks={taskData ?? []}
          teamId={String(teamId)}
        />
      ) : (
        <p></p>
      )}

      <AddTaskListModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        teamId={String(teamId)}
      />
      <div className="fixed bottom-[4rem] right-[4rem]">
        <Button
          round="full"
          size="medium"
          variant="default"
          onClick={handleOpenAddTaskModal}
          className="w-[13.8rem] text-[1.4rem] font-semibold text-text-primary"
        >
          + 할 일 추가
        </Button>
      </div>
      <AddTaskModal
        isOpenModal={isOpenAddTaskModal}
        handleCloseModal={handleCloseAddTaskModal}
      />
    </div>
  );
}
