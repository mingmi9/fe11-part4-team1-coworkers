import todo from '@images/img_todo.png';
import done from '@images/img_done.png';
import ReportCard from './ReportCard';

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
                    <ReportCard title="오늘의 할 일" value={alltasks} imgSrc={todo}/>
                    <ReportCard title="한 일" value={completedtasks} imgSrc={done}/>
                </div>
            </div>
        </div>
    )
}