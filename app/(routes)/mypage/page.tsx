'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/_hooks/useUser';
import { useImage } from '@/_hooks/useImage';
import DeleteUserBtn from '@/_components/mypage/DeleteUserBtn';
import ProfileForm from '@/_components/mypage/ProfileForm';
import ProfileImage from '@/_components/mypage/ProfileImage';
import DefaultProfile from '@icons/member.svg';

export default function MyAccoutePage() {
  const { useGetUserInfo, useUpdateUserInfo, usePassword, useDeleteUser } =
    useUser();
  const { useUploadImage } = useImage();
  const { data: userData } = useGetUserInfo;
  const { mutate: updateUser } = useUpdateUserInfo;
  const { mutate: updatePassword } = usePassword;
  const { mutate: deleteUser } = useDeleteUser;
  const { mutate: uploadImage } = useUploadImage;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    nickname: userData?.nickname || '',
    email: userData?.email || '',
    password: '',
    image: userData?.image || '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        nickname: userData.nickname,
        email: userData.email,
        password: '',
        image: userData?.image,
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateUser({ nickname: formData.nickname, image: formData.image });
  };

  const handlePasswordChange = () => {
    if (!formData.password) return;
    updatePassword({
      password: formData.password,
      passwordConfirmation: formData.password,
    });
  };

  const handleImageUpload = (file: File) => {
    uploadImage(file, {
      onSuccess: (response) => {
        const imageUrl = response.url;
        setFormData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
        updateUser({ nickname: formData.nickname, image: imageUrl });
      },
    });
  };

  const handleDeleteUser = () => {
    deleteUser();
    setIsOpenModal(false);
  };

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div className="mx-auto mt-[4rem] flex h-auto max-w-[79.2rem] flex-col justify-center gap-[2.4rem]">
      <div>
        <span className="text-[2rem] font-bold text-text-primary">
          계정 설정
        </span>
        <div className="mt-[2.4rem] flex flex-col justify-center">
          <div className="flex flex-col gap-[2.4rem]">
            <ProfileImage
              image={formData.image || DefaultProfile}
              onImageUpload={handleImageUpload}
            />
            <ProfileForm
              nickname={formData.nickname}
              email={formData.email}
              password={formData.password}
              onChange={handleChange}
              onUpdate={handleUpdate}
              onPasswordChange={handlePasswordChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center"></div>
        </div>
        <DeleteUserBtn
          isOpen={isOpenModal}
          onOpen={handleOpenModal}
          onClose={handleCloseModal}
          onDelete={handleDeleteUser}
        />
      </div>
    </div>
  );
}
