export interface PostResBody {
  title: string;
  description: string;
  formData: FormData;
}

export interface UpdateResBody extends PostResBody {
  mediaToDelete?: string[];
}
