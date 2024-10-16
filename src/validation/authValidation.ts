import { Request, Response, NextFunction } from "express";
import validator from "validator";

// Validate signup data
export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  let errors: string[] = [];

  if (validator.isEmpty(username)) {
    errors.push("Username is required");
  }

  if (!validator.isEmail(email)) {
    errors.push("Invalid email address");
  }

  if (!validator.isLength(password, { min: 6 })) {
    errors.push("Password must be at least 6 characters long");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// Validate login data
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  next();
};

{
  /*
When you call next() inside a validation function, it does not directly pass control to another function within the validation file itself.
Instead, it passes control to the next function defined in the route where this middleware was used. In this case, it's typically the controller function. 

for ex:
1)Incoming Request:
A request is made to /login.

2)Validation Middleware (validateLogin):
This function checks if the login data is correct. If everything is valid, it calls next().

3)What Happens When next() is Called:
Calling next() tells Express to proceed to the next function in the route, which is login from the authController.ts file.

4)Controller Function (login) Execution:
The login function in the authController.ts handles the main business logic, like authenticating the user.
*/
}
