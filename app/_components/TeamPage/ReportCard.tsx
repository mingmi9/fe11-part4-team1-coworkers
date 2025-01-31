import Image, { StaticImageData } from 'next/image';

interface ReportCardProps {
  title: string;
  value: number;
  imgSrc: StaticImageData;
}

export default function ReportCard({ title, value, imgSrc }: ReportCardProps) {
  return (
    <div className="flex h-[7.65rem] items-center justify-between rounded-[1.2rem] bg-background-tertiary p-[1.6rem] mobile:w-[14.2rem] tablet:w-[28rem] pc:w-[40rem]">
      <div>
        <div className="text-[1.2rem] text-text-primary">{title}</div>
        <div className="text-[2.4rem] font-bold text-brand-tertiary">
          {value}개
        </div>
      </div>
      <Image src={imgSrc} alt="오늘의 할일" width={40} height={40} />
    </div>
  );
}
