import { UserType } from "./userTypes";

declare global {
  namespace Express {
    interface Request {
      user?: UserType; // Add the `user` property
    }
  }
}
