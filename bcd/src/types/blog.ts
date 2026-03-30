export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string; // 이 ID로 나중에 도형을 그립니다.
  createdAt: string;
}