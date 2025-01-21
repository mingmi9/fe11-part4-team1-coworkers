// 'use client';

import Image from 'next/image';
// import { useState } from 'react';

import gnbMenu from '@icons/gnb-menu.svg';
// import Sidebar from '@/_components/common/Sidebar';

const GnbButton = () => {
  // const [isSidebarOpen, setIsSidebarOpen ] = useState(false)
  
  return (
    <>
      <button
        type="button"
        // onClick={() => setIsSidebarOpen(true)}
        className="flex items-center justify-center p-1 rounded-md"
        aria-label="메뉴 열기"
        // aria-expanded={isSidebarOpen}
        // aria-controls="mobile-sidebar"
      >
        <Image
          src={gnbMenu}
          alt="상단 메뉴"
          width={24}
          height={24}
          sizes="2.4rem"
          className="cursor-pointer"
        />
      </button>
      {/* <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        id="mobile-sidebar"
      /> */}
    </>
  );
};

export default GnbButton;