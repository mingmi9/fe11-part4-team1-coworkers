import Image, { StaticImageData } from "next/image";

interface ReportCardProps {
    title: string;
    value: number;
    imgSrc: StaticImageData;
}

export default function ReportCard({title,value,imgSrc}: ReportCardProps) {
    return (
        <div className="flex justify-between items-center rounded-[1.2rem] bg-background-tertiary w-[40rem] h-[7.65rem] p-[1.6rem]">
            <div>
                <div className="text-text-primary text-[1.2rem]">
                    {title}
                </div>
                <div className="text-brand-tertiary text-[2.4rem] font-bold">
                    {value}개
                </div>
            </div>
            <Image src={imgSrc} alt="오늘의 할일" width={40} height={40}/>
        </div>
    )
}