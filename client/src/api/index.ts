import axios from "axios";
import { PostResBody } from "./interface";
import { UpdateThunkArg } from "../store/post-list/interface";

export default class PostService {
  static async getAll() {
    const response = await axios.get(`/api/post`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbWFuMzkyOEBtYWlsLnJ1IiwiaWQiOiI1ZWNjMTQxYS04MzRjLTRjMjctYWM5ZS1lMThhMzZmMzdkYTkiLCJpYXQiOjE3MDc3NDM0OTksImV4cCI6NTMwNzc0MzQ5OX0.TDRHXP4Ona15PwWdmfNiG-f99Q90FzTfQU2DBfwTI6Y",
      },
    });

    return response.data;
  }

  static async getById(id: string) {
    const response = await axios.get(`/api/post/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbWFuMzkyOEBtYWlsLnJ1IiwiaWQiOiI1ZWNjMTQxYS04MzRjLTRjMjctYWM5ZS1lMThhMzZmMzdkYTkiLCJpYXQiOjE3MDc3NDM0OTksImV4cCI6NTMwNzc0MzQ5OX0.TDRHXP4Ona15PwWdmfNiG-f99Q90FzTfQU2DBfwTI6Y",
      },
    });

    return response.data;
  }

  static async delete(id: string) {
    const response = await axios.delete(`/api/post/${id}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbWFuMzkyOEBtYWlsLnJ1IiwiaWQiOiI1ZWNjMTQxYS04MzRjLTRjMjctYWM5ZS1lMThhMzZmMzdkYTkiLCJpYXQiOjE3MDc3NDM0OTksImV4cCI6NTMwNzc0MzQ5OX0.TDRHXP4Ona15PwWdmfNiG-f99Q90FzTfQU2DBfwTI6Y",
      },
    });

    return { status: response.status, id };
  }

  static async create(createParams: PostResBody) {
    const response = await axios.post(
      `/api/post`,
      {
        title: createParams.title,
        description: createParams.description,
        images: createParams.formData.getAll("images[]"),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbWFuMzkyOEBtYWlsLnJ1IiwiaWQiOiI1ZWNjMTQxYS04MzRjLTRjMjctYWM5ZS1lMThhMzZmMzdkYTkiLCJpYXQiOjE3MDc3NDM0OTksImV4cCI6NTMwNzc0MzQ5OX0.TDRHXP4Ona15PwWdmfNiG-f99Q90FzTfQU2DBfwTI6Y",
        },
      }
    );

    const createdPost = await this.getById(response.data.id);

    return createdPost;
  }

  static async update(updateParams: UpdateThunkArg) {
    const response = await axios.put(
      `/api/post/${updateParams.id}`,
      {
        title: updateParams.title,
        description: updateParams.description,
        mediaToAdd: updateParams.formData.getAll("mediaToAdd[]"),
        mediaToDelete: updateParams.mediaToDelete,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbWFuMzkyOEBtYWlsLnJ1IiwiaWQiOiI1ZWNjMTQxYS04MzRjLTRjMjctYWM5ZS1lMThhMzZmMzdkYTkiLCJpYXQiOjE3MDc3NDM0OTksImV4cCI6NTMwNzc0MzQ5OX0.TDRHXP4Ona15PwWdmfNiG-f99Q90FzTfQU2DBfwTI6Y",
        },
      }
    );

    const updatedPost = await this.getById(updateParams.id);

    return response.data;
  }
}
