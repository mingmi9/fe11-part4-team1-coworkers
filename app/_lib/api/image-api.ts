import { instance } from '../axios-instance';

// 이미지 업로드 엔드포인트
export const uploadImage = async (
  imageFile: File,
): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await instance.post(`/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
