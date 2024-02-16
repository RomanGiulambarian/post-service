import axios from "axios";

export default class AuthService {
  constructor() {}

  async login(email: string, password: string) {
    const responce = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });

    return responce.data;
  }
}
