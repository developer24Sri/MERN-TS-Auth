import { Schema, model } from "mongoose";

// Define the IUser interface
export interface IUser {
  username: string;
  email: string;
  password: string;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//User Model
const User = model<IUser>("User", userSchema);

export default User;

{
  /*
A schema in Mongoose defines the structure, types, default values, and validation of your MongoDB documents. It’s essentially a blueprint for how the data in a particular collection will look.
Purpose:
Defines what fields your documents will have (e.g., username, email, password).
Specifies data types (e.g., String, Number, Boolean).
Sets validation rules (e.g., required fields, unique constraints).
Ensures that all documents within a collection have a consistent structure.

A model in Mongoose is a wrapper around the schema that provides an interface to interact with the database. Models are responsible for creating, reading, updating, and deleting documents.
Purpose:
Uses the schema to enforce structure and validation on data being saved to the database.
Provides methods (like save, find, findById, etc.) to interact with the corresponding collection in MongoDB.

firstely the IUser Interface: Defines the TypeScript interface for the user object, specifying the types of username, email, and password. This ensures type safety when working with user objects in TypeScript.
then we create a new schema with the "IUser" structure which specifies the unamw with req string and etc. and

hear in this line: const User = model<IUser>('User', userSchema);
The model function creates a Mongoose model named 'User' based on userSchema.
This model will interact with the MongoDB collection called users (automatically pluralized from 'User').
and finally we export the User model and in authService file, the User model is used to create new users (new User()), save them (userDoc.save()), and find users by ID (User.findById()).
The model enforces the rules defined by the schema whenever it interacts with the database, ensuring that all operations adhere to the expected structure and validation constraints.
*/
}
