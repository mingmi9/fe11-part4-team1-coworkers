import Image from 'next/image';
import todo from '@images/img_todo.png';
import done from '@images/img_done.png';

interface ReportSectionProps {
    alltasks: number;
    completedtasks: number;
}

export default function ReportSection ({alltasks, completedtasks}: ReportSectionProps) {
    const graph = Math.round((completedtasks / alltasks) * 100);
    return (
        <div>
            <div className="text-text-primary text-[1.6rem] mb-[2.4rem]">
                리포트
            </div>
            <div className="w-[120rem] h-[21.7rem] flex items-center justify-between bg-background-secondary rounded-[1.2rem] p-[2.4rem] gap-[1rem]">
                <div className="flex items-center gap-[3rem] ml-[2rem]">
                    <div className="relative w-[17rem] h-[17rem] rounded-full">
                        <div className="absolute inset-0 w-full h-full rounded-full " style={{background: `conic-gradient(from 90deg, #a3e635, #22c55e ${graph}% 0%, #334155 ${graph}% 100%)`,}}/>
                        <div className="absolute inset-11 flex items-center justify-center bg-background-secondary rounded-full"/>
                    </div>
                    <div>
                        <div className="text-text-primary text-[1.4rem]">
                            오늘의 진행상황
                        </div>
                        <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-lime-400 text-[4rem] font-bold">
                            {graph}%
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <div className="flex justify-between items-center rounded-[1.2rem] bg-background-tertiary w-[40rem] h-[7.65rem] p-[1.6rem]">
                        <div>
                            <div className="text-text-primary text-[1.2rem]">
                                오늘의 할 일
                            </div>
                            <div className="text-brand-tertiary text-[2.4rem] font-bold">
                                {alltasks}개
                            </div>
                        </div>
                        <Image src={todo} alt="오늘의 할일" width={40} height={40}/>
                    </div>
                    <div className="flex justify-between items-center rounded-[1.2rem] bg-background-tertiary w-[40rem] h-[7.65rem] p-[1.6rem]">
                        <div>
                            <div className="text-text-primary text-[1.2rem]">
                                한 일
                            </div>
                            <div className="text-brand-tertiary text-[2.4rem] font-bold">
                                {completedtasks}개
                            </div>
                        </div>
                        <Image src={done} alt="한 일" width={40} height={40}/>
                    </div>
                </div>
            </div>
        </div>
    )
}