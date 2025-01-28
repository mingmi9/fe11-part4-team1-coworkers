import dayjs from 'dayjs';
import { JSX, useState } from 'react';
import LeftArrow from '@icons/ic_arrow-left.svg';
import RightArrow from '@icons/ic_arrow-right.svg';
import Image from 'next/image';

interface CalendarInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (data: string) => void;
}

export default function CalendarInModal({
  isOpen,
  onClose,
  onDateSelect,
}: CalendarInModalProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const daysInMonth = endOfMonth.date();

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const renderDays = () => {
    const days: JSX.Element[] = [];
    const firstDayOfWeek = startOfMonth.day();
    const lastMonth = currentDate.subtract(1, 'month');
    const nextMonth = currentDate.add(1, 'month');

    const lastMonthDays = lastMonth.daysInMonth();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = lastMonth.date(lastMonthDays - i);
      const fullDate = date.format('YYYY년 MM월 DD일');
      days.push(
        <div
          key={`prev-${fullDate}`}
          className="flex h-[3.2rem] w-[4.343rem] items-center justify-center text-[1.4rem] font-medium text-text-default"
        >
          {date.date()}
        </div>,
      );
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const fullDate = currentDate.date(date).format('YYYY년 MM월 DD일');

      days.push(
        <button
          key={fullDate}
          className="cursor-not-allowedhover:rounded-[0.8rem] flex h-[3.2rem] w-[4.343rem] items-center justify-center text-[1.4rem] font-medium text-text-primary hover:rounded-[0.8rem] hover:bg-brand-primary hover:text-background-secondary"
          onClick={() => onDateSelect(fullDate)}
        >
          {date}
        </button>,
      );
    }

    const totalSlots = firstDayOfWeek + daysInMonth;
    const remainingSlots = 7 - (totalSlots % 7);

    for (let i = 1; i <= remainingSlots; i++) {
      const date = nextMonth.date(i);
      const fullDate = date.format('YYYY-MM-DD');
      days.push(
        <div
          key={`next-${fullDate}`}
          className="flex h-[3.2rem] w-[4.343rem] items-center justify-center text-[1.4rem] font-medium text-text-default"
        >
          {date.date()}
        </div>,
      );
    }

    return days;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-auto w-[33.6rem] rounded-[1.2rem] border-[0.1rem] border-solid border-interaction-hover bg-background-secondary p-[1.6rem]"
      >
        <div className="flex items-center justify-between">
          <button onClick={handlePrevMonth}>
            <Image src={LeftArrow} alt="왼쪽 화살표" width={24} height={24} />
          </button>
          <span className="py-[0.5rem] text-[1.4rem] font-medium">
            {currentDate.format('MMMM YYYY')}
          </span>
          <button onClick={handleNextMonth}>
            <Image
              src={RightArrow}
              alt="오른쪽 화살표"
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="flex h-[3.2rem] items-center justify-center text-center"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">{renderDays()}</div>
      </div>
    </div>
  );
}
