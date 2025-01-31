import todo from '@images/img_todo.png';
import done from '@images/img_done.png';
import ReportCard from './ReportCard';
import useResize from '@/_hooks/useResize';

interface ReportSectionProps {
  alltasks: number;
  completedtasks: number;
}

export default function ReportSection({
  alltasks,
  completedtasks,
}: ReportSectionProps) {
  const screenType = useResize();

  const graph =
    alltasks === 0 ? 0 : Math.round((completedtasks / alltasks) * 100);
  return (
    <div className="w-full">
      <div className="mb-[2.4rem] text-[1.6rem] text-text-primary">리포트</div>
      <div className="flex h-[21.7rem] items-center justify-between gap-[1rem] rounded-[1.2rem] bg-background-secondary p-[2.4rem] mobile:h-[22.4rem]">
        <div className="flex items-center gap-[3rem] tablet:ml-[2rem] pc:ml-[2rem]">
          <div className="relative h-[17rem] w-[17rem] rounded-full mobile:h-[13rem] mobile:w-[13rem]">
            <div
              className="absolute inset-0 h-full w-full rounded-full"
              style={{
                background: `conic-gradient(from 90deg, #a3e635, #22c55e ${graph}% 0%, #334155 ${graph}% 100%)`,
              }}
            />
            <div className="absolute inset-9 flex flex-col items-center justify-center rounded-full bg-background-secondary">
              {screenType === 'mobile' ? (
                <>
                  <div className="text-[1.2rem]">오늘</div>
                  <div className="bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-[2rem] font-bold text-transparent">
                    {graph}%
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          {screenType === 'mobile' ? (
            ''
          ) : (
            <div>
              <div className="text-[1.4rem] text-text-primary">
                오늘의 진행상황
              </div>
              <div className="bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-[4rem] font-bold text-transparent">
                {graph}%
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[1rem]">
          <ReportCard title="오늘의 할 일" value={alltasks} imgSrc={todo} />
          <ReportCard title="한 일" value={completedtasks} imgSrc={done} />
        </div>
      </div>
    </div>
  );
}
