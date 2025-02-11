'use client';

import React from 'react';
import Image from 'next/image';

const SimpleLogin = () => {
  return (
    <div className="flex flex-col items-center mt-1 w-full max-w-[28.8rem]">
      <div className="flex items-center mb-4 w-full">
        <div className="flex-grow border-t border-border-primary"></div>
        <span className="px-4 text-text-inverse">OR</span>
        <div className="flex-grow border-t border-border-primary"></div>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-[1rem] font-medium text-text-inverse">간편 로그인하기</p>
        <div className="flex space-x-4">
          <button className="flex items-center justify-center w-[2.65rem] h-[2.65rem]  rounded-full shadow-md">
            <Image src="/images/google.png" alt="Google Login" width={42} height={42} />
          </button>
          <button className="flex items-center justify-center w-[2.65rem] h-[2.65rem]  rounded-full shadow-md">
            <Image src="/images/kakaotalk.png" alt="Kakao Login" width={42} height={42} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;


