import { uploadImage } from '@/_lib/api/image-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 이미지 업로드 엔드포인트
export const useImage = () => {
  const queryClient = useQueryClient();

  const useUploadImage = useMutation({
    mutationFn: (imageFile: File) => uploadImage(imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });

  return { useUploadImage };
};
