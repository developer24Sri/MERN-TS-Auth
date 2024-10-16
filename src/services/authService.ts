import jwt from "jsonwebtoken";
import User from "../models/userModels";
import { UserType, JwtPayload } from "../Types/userTypes";

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

// Generate JWT Token
const generateToken = (user: UserType) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h", // Token expiry time
  });
};

// Register User model and Generate Token
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userDoc = new User({ username, email, password });
  const user = await userDoc.save();

  // Cast Mongoose document to UserType
  const userTyped = user.toObject() as UserType;

  const token = generateToken(userTyped);
  return { user: userTyped, token };
};

// Login User and Validate Token
export const loginUser = async (email: string, password: string) => {
  const userDoc = await User.findOne({ email }).exec();
  if (!userDoc) throw new Error("User not found");

  const user = userDoc.toObject() as UserType;

  if (user.password !== password) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return { user, token };
};

// Verify Token during Login
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

{
  /*
Now hear first we define a secret key for signing JWT tokens, ensuring security by keeping this key confidential (usually stored in an environment variable). And
and we create a function called genetateToken where we Creates a token containing the user’s unique ID and email using that sign method of jwt. This token is used for authenticating user sessions without needing to re-send credentials. And
we create a function called registerUser which we used to call in authController file hear we first creats an instance User and store the recived uname, email and password and on the next line we save it in the mongoDB database by using the keyword of it caleed save(); and
we convert the mongoose doc to a plain JS object the reasion bcos Mongoose documents come with additional methods and properties that are not needed when creating the token. Converting it makes it simpler and ensures the object conforms to the UserType. so the inside that 
userTyped we will be having _id, username, email and password and then we genetate token by calling the function which we created in the top so we  Calls the generateToken function with the userTyped object to generate a JWT token. so The generateToken function creates a token that includes the user’s _id and email as the payload.
and in last we return the userTyped and token so in the The controller receives the user and token from registerUser and sends a success response back to the client.
and for the verify function we just verify the token and the secret key which was generated during the register time of the user. so, If the token is valid and has not expired, jwt.verify() decodes the token and returns the payload, which includes information like the user’s ID and email.
If the token is invalid (e.g., altered, expired, or signed with a different key), it throws an error.
*/
}
