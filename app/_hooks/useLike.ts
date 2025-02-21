import { likeArticle, deleteLikeArticle } from '@/_lib/api/like-api';
import { useAuthStore } from '@/_store/auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type LikeArticleType = {
  liked: boolean;
  likesCount: number;
};

type UseLikeParams = {
  articleId: number;
  liked: boolean;
};

// 좋아요 & 좋아요 취소
export const useLike = () => {
  const { user, accessToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, liked }: UseLikeParams) => {
      if (!user || !accessToken) {
        throw new Error('로그인 필요');
      }

      if (liked) {
        return likeArticle(articleId, accessToken);
      } else {
        return deleteLikeArticle(articleId, accessToken);
      }
    },

    onMutate: async ({ articleId, liked }: UseLikeParams) => {
      await queryClient.cancelQueries({ queryKey: ['articles', articleId] });

      const previousArticle = queryClient.getQueryData<LikeArticleType>([
        'articles',
        articleId,
      ]);

      queryClient.setQueryData<LikeArticleType>(
        ['articles', articleId],
        (old) => ({
          ...old,
          liked: !liked,
          likesCount: liked
            ? Math.max((old?.likesCount || 1) - 1, 0)
            : (old?.likesCount || 0) + 1,
        }),
      );

      return { previousArticle };
    },

    onError: (error, { articleId }: UseLikeParams, context) => {
      queryClient.setQueryData(
        ['articles', articleId],
        context?.previousArticle,
      );
    },

    onSettled: (data, error, { articleId }: UseLikeParams) => {
      queryClient.invalidateQueries({ queryKey: ['articles', articleId] });
    },
  });
};
