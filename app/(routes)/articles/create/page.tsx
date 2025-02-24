'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Divider } from '@/_components/articles/Card';
import Button from '@/_components/common/Button';
import InputField from '@/_components/articles/InputField';

import { useAuthStore } from '@/_store/auth-store';
import { useArticle } from '@/_hooks/useArticle';
import { useImage } from '@/_hooks/useImage';

const CreateArticlePage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { useCreateArticle } = useArticle();
  const { useUploadImage } = useImage();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [hasHydrated, setHasHydrated] = useState(false);

  const { mutateAsync: createArticle, isPending: isSubmitting } =
    useCreateArticle;
  const { mutateAsync: uploadImage, isPending: isUploadingImage } =
    useUploadImage;
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const contentInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  // 제목, 내용 입력
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setTitleError('');
    } else {
      setTitleError('제목을 입력해주세요.');
    }
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
    if (e.target.value.trim()) {
      setContentError('');
    } else {
      setContentError('내용을 입력해주세요.');
    }
  };

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // 이미지 제거
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  // 필수 값 포커스
  const setErrorAndFocus = (
    inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
    errorSetter: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string,
  ) => {
    errorSetter(errorMessage);
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  // 게시글 등록 핸들러
  const handleSubmit = async () => {
    // 제목 및 내용 체크
    if (!title.trim()) {
      setErrorAndFocus(titleInputRef, setTitleError, '제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      setErrorAndFocus(
        contentInputRef,
        setContentError,
        '내용을 입력해주세요.',
      );
      return;
    }

    // 이미지 등록
    let imageUrl: string | undefined;
    if (image) {
      try {
        const uploadResponse = await uploadImage(image);
        imageUrl = uploadResponse?.url;
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    // 게시글 등록
    const articleData = {
      title,
      content,
      ...(imageUrl && { image: imageUrl }),
    };

    try {
      const response = await createArticle(articleData);
      alert('게시글이 등록되었습니다.');
      router.replace(`/articles/${response.id}`);
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  // 로그인 체크
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  }, [isLoggedIn, hasHydrated, router]);

  const isDisabled = isUploadingImage || isSubmitting;
  return (
    <div className="py-[4rem] tablet:py-[5.6rem]">
      <div className="flex items-center justify-between">
        <h2 className="py-[.5rem] text-lg font-medium tablet:text-xl tablet:font-bold">
          게시글 쓰기
        </h2>
        <div className="hidden tablet:block">
          <Button
            round="xl"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-[14.4rem] text-[1.6rem] font-semibold"
          >
            등록
          </Button>
        </div>
      </div>
      <Divider className="my-[2.4rem] tablet:my-[3.2rem] pc:my-[4rem]" />
      <InputField
        ref={titleInputRef}
        label="제목"
        value={title}
        onInputChange={handleTitleChange}
        errorMessage={titleError}
        required={true}
        type="text"
      />
      <InputField
        ref={contentInputRef}
        label="내용"
        value={content}
        onInputChange={handleContentChange}
        errorMessage={contentError}
        required={true}
        type="textarea"
      />
      <InputField
        label="이미지"
        value={title}
        previewImage={previewImage}
        onRemoveImage={handleRemoveImage}
        onImageUpload={handleImageUpload}
        type="file"
      />

      <div className="pt-[.8rem] text-[1.4rem] font-semibold tablet:hidden">
        <Button
          round="xl"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full font-semibold"
        >
          등록
        </Button>
      </div>
    </div>
  );
};

export default CreateArticlePage;
