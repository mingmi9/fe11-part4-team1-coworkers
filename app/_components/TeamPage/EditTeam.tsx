import { useState, useRef } from 'react';
import Image from 'next/image';
import Button from '../common/Button';
import btn from '@icons/btn-size-small.svg';
import Input from '../common/Input/Input';
import { updateGroupInfo } from '@/_lib/api/group-api';
import { uploadImage } from '@/_lib/api/image-api';
import { useRouter } from 'next/navigation';

interface EditTeamProps {
  teamImg: string;
  teamName: string;
  teamId: number;
}

export default function EditTeam({ teamImg, teamName, teamId }: EditTeamProps) {
  const [name, setName] = useState<string>(teamName);
  const [image, setImage] = useState(teamImg);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
      setImageFile(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const authStorage = localStorage.getItem('auth-storage');
      if (!authStorage) return;

      const parsedData = JSON.parse(authStorage);
      const accessToken = parsedData?.state?.accessToken;

      let imageUrl = image;

      if (imageFile) {
        const uploadedImage = await uploadImage(imageFile);
        imageUrl = uploadedImage.url;
      }

      await updateGroupInfo(
        teamId,
        { name, image: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      alert('팀 정보가 수정되었습니다!');
    } catch (error) {
      console.error('팀 수정 실패:', error);
      alert('팀 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
      router.push(`/team/${teamId}`);
      window.location.reload();
    }
  };

  return (
    <div>
      <h1 className="mb-[6rem] mt-[14rem] flex justify-center text-[4rem]">
        팀 수정하기
      </h1>
      <form className="flex flex-col gap-[2.4rem]" onSubmit={handleSubmit}>
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
        <Button size="large" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </form>
      <div className="mt-[2rem] flex justify-center text-[1.4rem]">
        팀 이름은 회사명이나 모임 이름등으로 설정하면 좋아요.
      </div>
    </div>
  );
}
