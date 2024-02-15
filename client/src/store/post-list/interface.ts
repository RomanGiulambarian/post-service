import { UpdateResBody } from "../../api/interface";

export interface Post {
  userId: number | null;
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  media: { id: string }[];
}

export interface PostListInitalState {
  posts: Post[];
  isLoading: boolean;
  error: boolean;
}

export interface UpdateThunkArg extends UpdateResBody {
  id: string;
}
