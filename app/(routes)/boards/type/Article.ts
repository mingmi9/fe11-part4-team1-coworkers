
export interface Writer {
  nickname: string;
  id: number;
}

export interface Article {
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image?: string | null;
  title: string;
  id: number;
}