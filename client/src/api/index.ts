import axios from "axios";

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
    const response = await axios.get(`/api/post/${id}`);

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
}
