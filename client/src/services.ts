import AuthService from "./api/auth-service";
import PostService from "./api/post-service";

export default class Service {
  private _postService: PostService | undefined;
  private _authService: AuthService | undefined;

  constructor() {}

  get postService() {
    if (!this._postService) {
      this._postService = new PostService();
    }
    return this._postService;
  }

  get authService() {
    if (!this._authService) {
      this._authService = new AuthService();
    }
    return this._authService;
  }
}
