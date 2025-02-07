'use client';

import { useState } from 'react';
import { Modal } from '../common/Modal';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import ToggleBtn from '@icons/toggle.svg';
import Image from 'next/image';
import CalendarInModal from './CalendarInModal';
import Input from '../common/Input/Input';

export default function AddTaskModal({
  isOpenModal,
  handleCloseModal,
}: {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}) {
  const [selectedOption, setSelectedOption] = useState('반복 안함');
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDay, setSelectedDay] = useState<string[]>([]);

  const handleOpenCalendar = () => setIsOpenCalendar(true);
  const handleCloseCalendar = () => setIsOpenCalendar(false);
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setIsOpenCalendar(false);
  };

  const handleDayToggle = (day: string) => {
    setSelectedDay((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
    console.log(selectedDay);
  };

  const options = ['한 번', '매일', '주 반복', '월 반복', '반복 안함'];
  const filteredOptions = options.filter((option) => option !== selectedOption);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <Modal.CloseButton onClose={handleCloseModal} className="mr-[1.6rem]" />
        <div className="mb-[2.4rem] flex flex-col gap-[1.6rem]">
          <Modal.Title
            title="할 일 만들기"
            className="mt-[3.2rem] flex flex-col"
          />
          <p className="text-[1.4rem] font-medium leading-[1.7rem] text-text-default">
            할 일은 실제로 행동 가능한 작업 중심으로
            <br />
            작성해주시면 좋습니다.
          </p>
        </div>
        <div className="mb-[3.2rem] flex flex-col gap-[2.4rem]">
          <div className="flex flex-col items-start gap-[0.8rem]">
            <span className="text-[1.6rem] font-medium leading-[1.9rem]">
              할 일 제목
            </span>
            <Input
              placeholder="할 일 제목을 입력해주세요."
              className="w-[33.6rem]"
            />
          </div>
          <div className="flex flex-col items-start gap-[1.6rem]">
            <span className="text-[1.6rem] font-medium leading-[1.9rem]">
              시작 날짜 및 시간
            </span>
            <button
              onClick={handleOpenCalendar}
              className={`h-[4.8rem] w-[33.6rem] rounded-[1.2rem] border-[0.1rem] border-border-primary bg-background-secondary pl-[1.6rem] text-left text-[1.6rem] font-normal text-text-default hover:border-interaction-hover ${isOpenCalendar ? 'border-interaction-hover' : ''}`}
            >
              {selectedDate ? selectedDate : '날짜를 선택해 주세요 '}
            </button>
            <CalendarInModal
              isOpen={isOpenCalendar}
              onClose={handleCloseCalendar}
              onDateSelect={handleSelectDate}
            />
          </div>
          <div className="w-[33.6rem]">
            <div className="flex flex-col justify-start gap-[1.6rem]">
              <span className="flex text-[1.6rem] font-medium leading-[1.9rem]">
                반복 설정
              </span>
              <Dropdown>
                {({ isOpen, toggleDropdown }) => (
                  <div>
                    <Dropdown.Button
                      onClick={toggleDropdown}
                      className="flex h-[4.4rem] w-[10.9rem] items-center justify-center rounded-[1.2rem] bg-[#18212f] px-[0.8rem] py-[1rem]"
                    >
                      <span className="flex w-[5.2rem] flex-row items-center justify-center text-[1.4rem] font-medium text-text-default">
                        {selectedOption}
                      </span>
                      <div>
                        <Image
                          src={ToggleBtn}
                          alt="드롭다운 메뉴 버튼"
                          width={24}
                          height={24}
                          className="ml-[0.8rem]"
                        />
                      </div>
                    </Dropdown.Button>
                    <Dropdown.Menu
                      isOpen={isOpen}
                      boxClass="w-[10.9rem] h-[16rem] border-solid border-[0.1rem] border-border-primary mt-[0.4rem]"
                    >
                      {filteredOptions.map((option) => (
                        <Dropdown.Item
                          key={option}
                          toggleDropdown={toggleDropdown}
                          className="text-[1.4rem] font-normal"
                          onClick={() => setSelectedOption(option)}
                        >
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </div>
                )}
              </Dropdown>

              {selectedOption === '주 반복' && (
                <div>
                  <span className="mb-[1.2rem] flex text-[1.6rem] font-medium text-text-primary">
                    반복 요일
                  </span>
                  <div className="flex justify-between">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`${selectedDay.includes(day) ? 'bg-brand-primary' : 'bg-[#18212F]'} flex h-[4.8rem] w-[4.4rem] items-center justify-center rounded-[1.2rem] text-[1.4rem] font-medium hover:bg-brand-primary`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-[0.8rem]">
            <span className="text-[1.6rem] font-medium leading-[1.9rem]">
              할 일 메모
            </span>
            <Input placeholder="메모를 입력해주세요." className="w-[33.6rem]" />
          </div>
        </div>
        <div className="mb-[3.2rem]">
          <Button size="modal-large" variant="default">
            만들기
          </Button>
        </div>
      </Modal>
    </div>
  );
}
