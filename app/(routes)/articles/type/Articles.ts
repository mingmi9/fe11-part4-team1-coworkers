export interface Writer {
  image?: string;
  nickname: string;
  id: number;
}

export interface Article {
  id: number;
  title: string;
  image?: string | null;
  createdAt: string;
  writer: Writer;
  isLiked?: boolean;
  likeCount: number;
  commentCount?: number;
}

export interface Comment {
  writer: Writer;
  createdAt: string;
  content: string;
  id: number;
}
