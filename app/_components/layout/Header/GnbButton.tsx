import Image from 'next/image';
import gnbMenu from '@icons/gnb-menu.svg';

const GnbButton = () => {
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-md p-1"
        aria-label="메뉴 열기"
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
    </>
  );
};

export default GnbButton;
