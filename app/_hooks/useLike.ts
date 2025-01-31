import { likeArticle, deleteLikeArticle } from '@/_lib/api/like-api';
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, liked }: UseLikeParams) =>
      liked ? deleteLikeArticle(articleId) : likeArticle(articleId),

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
