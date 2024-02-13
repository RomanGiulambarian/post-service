import { Request } from 'express';

export interface extendedRequest extends Request {
  user: {
    id: string;
    username: string;
    email: string;
  };
}
