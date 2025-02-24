'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Divider } from '@/_components/articles/Card';
import Button from '@/_components/common/Button';
import InputField from '@/_components/articles/InputField';

import { useAuthStore } from '@/_store/auth-store';
import { useArticle } from '@/_hooks/useArticle';
import { useImage } from '@/_hooks/useImage';

const EditArticlePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { isLoggedIn, user } = useAuthStore();
  const { useGetArticlesById, useUpdateArticle } = useArticle();
  const { useUploadImage } = useImage();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  const { mutateAsync: updateArticle, isPending: isSubmitting } =
    useUpdateArticle;
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
    setTitleError(e.target.value.trim() ? '' : '제목을 입력해주세요.');
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
    setContentError(e.target.value.trim() ? '' : '내용을 입력해주세요.');
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

  // 게시글 데이터 가져오기
  const {
    data: article,
    isLoading: isArticleLoading,
    isError: isArticleError,
  } = useGetArticlesById(Number(id));
  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setPreviewImage(article.image);
    }
  }, [article]);

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

  // 게시글 수정 핸들러
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
    let imageUrl: string | null = null;
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

    // 게시글 수정
    const articleData = {
      title,
      content,
      image: imageUrl || null,
    };

    try {
      await updateArticle({ articleId: Number(id), payload: articleData });
      alert('게시글이 수정되었습니다.');
      router.replace(`/articles/${id}`);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  // 로그인 체크
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    } else if (article && article?.writer?.id !== user?.id) {
      alert('접근 권한이 없습니다.');
      router.push(`/articles/${id}`);
    }
  }, [isLoggedIn, article, user, id, router]);

  // 로딩 및 에러
  if (isArticleLoading) {
    return <div>Loading...</div>;
  }

  if (isArticleError) {
    alert('데이터를 불러오는데 실패했습니다.');
    router.back();
  }

  // 버튼 disabled
  const isDisabled = isUploadingImage || isSubmitting;

  return (
    <div className="py-[4rem] tablet:py-[5.6rem]">
      <div className="flex items-center justify-between">
        <h2 className="py-[.5rem] text-lg font-medium tablet:text-xl tablet:font-bold">
          게시글 수정
        </h2>
        <div className="hidden gap-[.4rem] tablet:flex">
          <Button
            variant="secondary"
            round="xl"
            onClick={() => router.back()}
            className="w-[9rem] text-[1.6rem] font-semibold"
          >
            취소
          </Button>
          <Button
            round="xl"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-[9rem] text-[1.6rem] font-semibold"
          >
            수정
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
          className="mb-[.8rem] w-full"
        >
          수정
        </Button>
        <Button
          variant="secondary"
          round="xl"
          onClick={() => router.back()}
          className="w-full"
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default EditArticlePage;
