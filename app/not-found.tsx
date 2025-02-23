'use client';

import { useRouter } from 'next/navigation';
import Button from '@/_components/common/Button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center font-semibold">
      <p className="mb-3 text-[10rem] font-bold tablet:mb-4 tablet:text-[14rem]">
        404
      </p>
      <p className="mb-8 text-xl tablet:mb-12 tablet:text-2xl">
        페이지를 찾을 수 없습니다.
      </p>
      <Button
        className="h-[5rem] w-[20rem] text-base duration-300 tablet:h-[6rem] tablet:w-[24rem] tablet:text-lg"
        onClick={() => router.back()}
      >
        <span>이전 페이지로 돌아가기</span>
      </Button>
    </div>
  );
}
