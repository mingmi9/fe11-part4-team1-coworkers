'use client';

import Image from 'next/image';
import RepairIcon from '@icons/ic_repair.svg';
import TopImageLarge from '@images/landing-top-large.png';
import TopImageMedium from '@images/landing-top-medium.png';
import TopImageSmall from '@images/landing-top-small.png';
import BottomImageLarge from '@images/landing-bottom-large.png';
import BottomImageMedium from '@images/landing-bottom-medium.png';
import BottomImageSmall from '@images/landing-bottom-small.png';
import Mockup01 from '@images/mockup01.png';
import Mockup02 from '@images/mockup02.png';
import Mockup03 from '@images/mockup03.png';
import FolderIcon from '@icons/Folder_fill.svg';
import MessageIcon from '@icons/message_fill.svg';
import DoneIcon from '@icons/done_fill.svg';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './_store/auth-store';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const handleStartClick = () => {
    router.push(isLoggedIn ? '/team' : '/login');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="relative z-0 w-full mobile:h-[64rem] tablet:h-[94rem] pc:h-[108rem]">
          <Image
            src={TopImageLarge}
            alt="상단 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="mobile:hidden tablet:hidden pc:block"
          />
          <Image
            src={TopImageMedium}
            alt="상단 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="mobile:hidden tablet:block pc:hidden"
          />
          <Image
            src={TopImageSmall}
            alt="상단 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="mobile:block tablet:hidden pc:hidden"
          />
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center mobile:mt-[5.5rem] tablet:mt-[10rem] pc:mt-[8.4rem]">
              <h2 className="font-semibold text-text-primary mobile:text-[2.4rem] tablet:text-[4rem] pc:text-[4.8rem]">
                함께 만들어가는 투두 리스트
              </h2>
              <div className="relative mobile:ml-[0.4rem] mobile:h-[2.8rem] mobile:w-[2.8rem] tablet:ml-[1.6rem] tablet:h-[4.8rem] tablet:w-[4.8rem] pc:ml-[2.4rem] pc:h-[5.6rem] pc:w-[5.6rem]">
                <Image src={RepairIcon} alt="수리 아이콘" layout="fill" />
              </div>
            </div>
            <h1 className="bg-gradation-main bg-clip-text font-semibold text-transparent mobile:text-[3.2rem] tablet:text-[4.8rem] pc:text-[6.4rem]">
              Coworkers
            </h1>
          </div>
          <div className="flex items-center justify-center mobile:mt-[42.1rem] tablet:mt-[56rem] pc:mt-[67.5rem]">
            <button
              onClick={handleStartClick}
              className="z-10 rounded-[3.2rem] bg-gradation-main text-[1.6rem] font-semibold focus:outline-none mobile:h-[4.5rem] mobile:w-[34.3rem] tablet:h-[4.8rem] tablet:w-[37.3rem] pc:h-[4.8rem] pc:w-[37.3rem]"
            >
              지금 시작하기
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mobile:gap-[2.4rem] tablet:gap-[2.4rem] pc:gap-[8rem]">
        <div className="relative rounded-[4rem] bg-gradation-main p-[0.1rem] mobile:h-[46.7rem] mobile:w-[34.3rem] tablet:h-[35.4rem] tablet:w-[69.6rem] pc:h-[41.9rem] pc:w-[99.6rem]">
          <div className="h-full w-full rounded-[4rem] bg-background-primary shadow-drop-shadow-white backdrop-blur-[1.2rem]">
            <div className="flex mobile:flex-col-reverse tablet:flex-row pc:flex-row">
              <div className="relative mobile:h-[27.3rem] mobile:w-[23.5rem] tablet:h-[27.3rem] tablet:w-[23.5rem] pc:h-[33.8rem] pc:w-[29.1rem]">
                <Image
                  src={Mockup01}
                  alt="그룹 사진"
                  layout="fill"
                  className="mobile:ml-[5.4rem] mobile:mt-[4rem] tablet:ml-[12.15rem] tablet:mt-[8.1rem] pc:ml-[17.4rem] pc:mt-[8.1rem]"
                />
              </div>
              <div className="flex flex-col gap-[1.6rem] mobile:ml-[5.4rem] mobile:mt-[4.8rem] tablet:ml-[21.15rem] tablet:mt-[12.4rem] pc:ml-[36.7rem] pc:mt-[15.5rem]">
                <div className="flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.2rem] border-[0.1rem] border-border-primary bg-background-secondary shadow-drop-shadow-black">
                  <Image
                    src={FolderIcon}
                    alt="폴더 아이콘"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="font-medium text-text-primary mobile:text-[1.8rem] mobile:leading-[2.1rem] tablet:text-[1.8rem] tablet:leading-[2.1rem] pc:text-[2.4rem] pc:leading-[2.8rem]">
                  그룹으로 <br /> 할 일을 관리해요
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[4rem] mobile:h-[46.7rem] mobile:w-[34.3rem] tablet:h-[35.4rem] tablet:w-[69.6rem] pc:h-[41.9rem] pc:w-[99.6rem]">
          <div className="h-full w-full rounded-[4rem] border-[0.1rem] border-border-primary bg-background-secondary backdrop-blur-[1.2rem]">
            <div className="flex mobile:flex-col-reverse tablet:flex-row pc:flex-row">
              <div className="flex flex-col gap-[1.6rem] mobile:ml-[5.4rem] mobile:mt-[4rem] mobile:items-start tablet:ml-[12.1rem] tablet:mt-[12.6rem] tablet:items-end pc:ml-[16.5rem] pc:mt-[15.1rem] pc:items-end">
                <div className="flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.2rem] border-[0.1rem] border-border-primary bg-background-secondary shadow-drop-shadow-black">
                  <Image
                    src={MessageIcon}
                    alt="메시지 아이콘"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="font-medium text-text-primary mobile:text-left mobile:text-[1.8rem] mobile:leading-[2.1rem] tablet:text-right tablet:text-[1.8rem] tablet:leading-[2.1rem] pc:text-right pc:text-[2.4rem] pc:leading-[2.8rem]">
                  간단하게 멤버들을 <br /> 초대해요
                </p>
              </div>
              <div className="relative mobile:h-[27.3rem] mobile:w-[23.5rem] tablet:h-[27.3rem] tablet:w-[23.5rem] pc:h-[33.8rem] pc:w-[29.1rem]">
                <Image
                  src={Mockup02}
                  alt="멤버 초대 사진"
                  layout="fill"
                  className="mobile:ml-[5.4rem] tablet:ml-[9rem] pc:ml-[19.4rem]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[4rem] mobile:h-[46.7rem] mobile:w-[34.3rem] tablet:h-[35.4rem] tablet:w-[69.6rem] pc:h-[41.9rem] pc:w-[99.6rem]">
          <div className="h-full w-full rounded-[4rem] bg-slate-950 backdrop-blur-[1.2rem]">
            <div className="flex mobile:flex-col tablet:flex-row pc:flex-row">
              <div className="relative mobile:h-[27.3rem] mobile:w-[23.5rem] tablet:h-[27.3rem] tablet:w-[23.5rem] pc:h-[33.8rem] pc:w-[29.1rem]">
                <Image
                  src={Mockup03}
                  alt="할 일 상세 사진"
                  layout="fill"
                  className="mobile:ml-[5.4rem] tablet:ml-[12.15rem] pc:ml-[17.4rem]"
                />
              </div>
              <div className="flex flex-col gap-[1.6rem] mobile:ml-[5.4rem] mobile:mt-[4.8rem] tablet:ml-[21.15rem] tablet:mt-[12.4rem] pc:ml-[36.7rem] pc:mt-[15.1rem]">
                <div className="flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[1.2rem] border-[0.1rem] border-border-primary bg-background-secondary shadow-drop-shadow-black">
                  <Image
                    src={DoneIcon}
                    alt="완료 아이콘"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="font-medium text-text-primary mobile:text-[1.8rem] mobile:leading-[2.1rem] tablet:text-[1.8rem] tablet:leading-[2.1rem] pc:text-[2.4rem] pc:leading-[2.8rem]">
                  할 일도 간편하게 <br /> 체크해요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="relative w-full mobile:h-[64rem] tablet:h-[94rem] pc:h-[108rem]">
          <div className="flex flex-col items-center justify-center gap-[1.6rem]">
            <h2 className="font-semibold text-text-primary mobile:mt-[12.3rem] mobile:text-[2.4rem] tablet:mt-[17.6rem] tablet:text-[4rem] pc:mt-[23rem] pc:text-[4rem]">
              지금 바로 시작해보세요
            </h2>
            <p className="text-center font-medium text-text-primary mobile:text-[1.6rem] tablet:text-[2.4rem] pc:text-[2.4rem]">
              팀원 모두와 같은 방향,{' '}
              <br className="mobile:block tablet:hidden pc:hidden" />
              같은 속도로 나아가는 가장 쉬운 방법
            </p>
          </div>
          <Image
            src={BottomImageLarge}
            alt="하단 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="mobile:hidden tablet:hidden pc:block"
          />
          <Image
            src={BottomImageMedium}
            alt="하단 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="mobile:hidden tablet:block pc:hidden"
          />
          <Image
            src={BottomImageSmall}
            alt="하단 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="mobile:block tablet:hidden pc:hidden"
          />
        </div>
      </div>
    </div>
  );
}
