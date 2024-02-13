export interface Post {
  userId: number | null;
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  media: { id: string }[];
}

export interface PostListInitalState {
  posts: Post[];
  isLoading: boolean;
  error: boolean;
}
