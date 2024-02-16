import axios from "axios";
import { PostResBody } from "./interface";
import { UpdateThunkArg } from "../../store/post-list/interface";

export default class PostService {
  defaultHeaders: any;

  constructor() {
    this.defaultHeaders = {};
  }

  async getAll() {
    const response = await axios.get(`/api/post`, {
      headers: {
        ...this.defaultHeaders,
      },
    });

    return response.data;
  }

  async getById(id: string) {
    const response = await axios.get(`/api/post/${id}`, {
      headers: {
        ...this.defaultHeaders,
      },
    });

    return response.data;
  }

  async delete(id: string) {
    const response = await axios.delete(`/api/post/${id}`, {
      headers: {
        ...this.defaultHeaders,
      },
    });

    return { status: response.status, id };
  }

  async create(createParams: PostResBody) {
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
          ...this.defaultHeaders,
        },
      }
    );

    const createdPost = await this.getById(response.data.id);

    return createdPost;
  }

  async update(updateParams: UpdateThunkArg) {
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
          ...this.defaultHeaders,
        },
      }
    );

    return response.data;
  }

  setHeader(name: string, value: string | null = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}
