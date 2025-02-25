import Image from 'next/image';
import { useRef } from 'react';
import ProfileDefault from '@icons/member.svg';
import ImageEditBtn from '@icons/btn_edit.svg';

interface ProfileImageProps {
  image: string;
  onImageUpload: (file: File) => void;
}

export default function ProfileImage({
  image,
  onImageUpload,
}: ProfileImageProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
  };
  return (
    <div>
      <div className="relative flex h-[6.4rem] w-[6.4rem]">
        <Image
          src={image || ProfileDefault}
          alt="프로필 사진"
          width={64}
          height={64}
          className="rounded-full"
        />

        <button className="absolute bottom-0 right-0" onClick={handleClick}>
          <Image
            src={ImageEditBtn}
            alt="프로필 사진 편집 버튼"
            width={22}
            height={22}
          />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
