export interface Writer {
  nickname: string;
  id: number;
}

export interface Article {
  createdAt: string;
  id: number;
  title: string;
  image?: string | null;
  writer: Writer;
  likeCount: number;
}
