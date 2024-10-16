import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { getErrorMessage } from "../Types/authControllerTypes";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await registerUser(username, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(401).json({ message: getErrorMessage(error) });
  }
};

{
  /*
explanation1:
 req.body contains the data sent by the client in the body of the HTTP request. This data is typically sent from a form on the frontend (e.g., a signup or login form) and is captured on the server using middleware like express.json().

explanation2:
The line { user, token } = await registerUser(username, email, password); is a key part of the signup process that takes place in the signup controller function within the authController.ts. Here’s an explanation of what is happening step-by-step:

Explanation of the Line:
Calling the registerUser Function:

registerUser(username, email, password) is a call to a service function defined in authService.ts.
This function is responsible for creating a new user, saving them to the database, and generating a token for authentication.
await Keyword:

The await keyword is used because registerUser is an asynchronous function, meaning it returns a promise.
await pauses the execution of the signup function until the promise is resolved, ensuring that the user and token values are available for further use.
Destructuring the Response:

The response from registerUser is destructured into two variables: { user, token }.
This means the function registerUser returns an object containing a user object and a token string, and these are being unpacked directly.
  */
}
