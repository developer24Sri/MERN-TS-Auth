// Define the UserType interface
import { Document } from "mongoose";
export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string; // Note: In a real-world application, you should avoid exposing the password field
}

// Define the user payload for JWT token
export interface JwtPayload {
  id: string;
  email: string;
}
