'use client';

import dayjs from 'dayjs';
import { JSX, useEffect, useState } from 'react';
import LeftArrow from '@icons/ic_arrow-left.svg';
import RightArrow from '@icons/ic_arrow-right.svg';
import Image from 'next/image';

interface TaskCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (data: string) => void;
}

export default function TaskCalendar({
  isOpen,
  onClose,
  onDateSelect,
}: TaskCalendarProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const today = dayjs();

  useEffect(() => {
    if (!selectedDate) {
      const formattedDate = today.format('M월 D일 (ddd)');
      setSelectedDate(formattedDate);
      onDateSelect(formattedDate);
    }
  }, [onDateSelect, selectedDate, today]);

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
          className="flex h-[3.2rem] w-[3.571rem] items-center justify-center text-[1.4rem] font-medium text-text-default"
        >
          {date.date()}
        </div>,
      );
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const currentDay = currentDate.date(date);
      const fullDate = currentDate.date(date).format('M월 D일 (ddd)');

      const isToday = currentDay.isSame(today, 'day');

      days.push(
        <button
          key={fullDate}
          className={`${isToday ? 'text-brand-primary' : 'text-text-primary'} cursor-not-allowedhover:rounded-[0.8rem] flex h-[3.2rem] w-[3.571rem] items-center justify-center text-[1.4rem] font-medium hover:rounded-[0.8rem] hover:bg-brand-primary hover:text-background-secondary`}
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
          className="flex h-[3.2rem] w-[3.571rem] items-center justify-center text-[1.4rem] font-medium text-text-default"
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
    <div className="relative" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute left-[-4rem] top-[2rem] h-auto w-[28.2rem] rounded-[2.4rem] bg-background-secondary p-[1.6rem]"
      >
        <div className="flex items-center justify-between">
          <button onClick={handlePrevMonth}>
            <Image src={LeftArrow} alt="왼쪽 화살표" width={24} height={24} />
          </button>
          <span className="py-[0.5rem] text-[1.4rem] font-medium">
            {currentDate.locale('en').format('MMMM YYYY')}
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
              className="flex h-[3.2rem] items-center justify-center text-center text-[1.4rem] font-semibold"
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
