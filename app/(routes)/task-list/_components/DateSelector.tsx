'use client';

import Image from 'next/image';
import { useState } from 'react';

import { formatDate } from '@/_lib/utils/format-date';
import { Calendar } from '@/_components/common/ShadCN/Calendar/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/common/ShadCN/Popover/popover';

import arrowLeft from '@icons/arrow-left.svg';
import arrowRight from '@icons/arrow-right.svg';
import calendar from '@icons/icon_calendar.svg';

const DateSelector = (/*today*/) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date() /*new Date*() 삭제 후 today추가*/,
  );
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const handleDateChange = (direction: 'prev' | 'next') => {
    setSelectedDate((currentDate) => {
      const newDate = new Date(currentDate);
      const dayOffset = direction === 'prev' ? -1 : 1;
      newDate.setDate(newDate.getDate() + dayOffset);
      // API 로직
      return newDate;
    });
  };
  const handlePrevDate = () => handleDateChange('prev');
  const handleNextDate = () => handleDateChange('next');

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setPopoverOpen(false);
    } else {
      alert('다시 시도해주세요');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          className="flex size-[2rem] items-center justify-center rounded-full bg-background-secondary pc:size-[2.4rem]"
          onClick={handlePrevDate}
        >
          <Image src={arrowLeft} alt="이전 날짜" />
        </button>
        <h2 className="w-[11rem] text-center font-medium pc:w-[13rem] pc:text-[2rem]">
          {formatDate(selectedDate.toISOString(), 'M월 D일 (ddd)')}
        </h2>
        <button
          className="flex size-[2rem] items-center justify-center rounded-full bg-background-secondary pc:size-[2.4rem]"
          onClick={handleNextDate}
        >
          <Image src={arrowRight} alt="다음 날짜" />
        </button>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-background-tertiary">
              <Image src={calendar} alt="달력" className="size-6 pc:size-8" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto rounded-xl border border-interaction-hover bg-background-secondary p-0 shadow-lg"
            align="start"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
              className="text-text-primary"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="cursor-pointer">
        <span className="text-brand-primary">+ 새로운 목록 추가하기</span>
      </div>
    </div>
  );
};

export default DateSelector;
