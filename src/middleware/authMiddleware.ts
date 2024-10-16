import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";
import { JwtPayload } from "../Types/userTypes";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  if (token == null) return res.sendStatus(401); // If no token, unauthorized

  try {
    const payload = verifyToken(token) as JwtPayload; // Cast to JwtPayload
    req.user = {
      _id: payload.id,
      email: payload.email,
      username: "",
      password: "",
    };
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    res.sendStatus(403); // Forbidden if token is invalid
  }
};

{
  /*
Middleware Function:

Purpose: authenticateToken is a middleware function used to verify the JWT token included in the request header.
Functionality:
It extracts the token from the Authorization header.
It verifies the token using verifyToken() function from authService.
If the token is valid, it attaches the decoded user information to the req.user property.
If the token is valid, next() is called to pass control to the next middleware or route handler in the request processing pipeline.
If the token is invalid or not present, it responds with a 401 Unauthorized or 403 Forbidden status, and next() is not called.
*/
}
