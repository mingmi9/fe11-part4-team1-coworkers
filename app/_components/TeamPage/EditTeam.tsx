import { useState, useRef } from 'react';
import Image from 'next/image';
import Button from '../common/Button';
import btn from '@icons/btn-size-small.svg';
import Input from '../common/Input/Input';

interface EditTeamProps {
  teamImg: string;
  teamName: string;
}

export default function EditTeam({ teamImg, teamName }: EditTeamProps) {
  const [name, setName] = useState(teamName);
  const [image, setImage] = useState(teamImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <h1 className="mb-[6rem] mt-[14rem] flex justify-center text-[4rem]">
        팀 수정하기
      </h1>
      <form className="flex flex-col gap-[2.4rem]">
        <div className="flex flex-col gap-[0.8rem]">
          <div>팀 프로필</div>
          <div className="relative">
            <div
              className="h-[6.4rem] w-[6.4rem] overflow-hidden rounded-full border-[0.3rem] border-border-primary/10 object-cover hover:brightness-75"
              onClick={handleImageClick}
              style={{ cursor: 'pointer', display: 'inline-block' }}
            >
              <Image src={image} alt="팀 이미지" width={64} height={64} />
            </div>
            <Image
              className="absolute bottom-0 left-[4.8rem]"
              src={btn}
              alt="이미지 변경"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <div>팀 이름</div>
          <div>
            <Input
              className="h-[4rem] w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </div>
        </div>
        <Button size="large">수정하기</Button>
      </form>
      <div className="mt-[2rem] flex justify-center text-[1.4rem]">
        팀 이름은 회사명이나 모임 이름등으로 설정하면 좋아요.
      </div>
    </div>
  );
}
