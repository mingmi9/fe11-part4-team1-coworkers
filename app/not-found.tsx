'use client';

import { useRouter } from 'next/navigation';

import Button from '@/_components/common/Button';
export default function NotFound() {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-[16rem] font-bold">404</h1>
      <h2 className="mb-12 text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
      <Button
        className="h-[6rem] w-[24rem] text-lg font-bold duration-300"
        onClick={() => router.back()}
      >
        <span>이전 페이지로 돌아가기</span>
      </Button>
    </div>
  );
}
