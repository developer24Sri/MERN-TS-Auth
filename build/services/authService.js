"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModels_1 = __importDefault(require("../models/userModels"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
// Generate JWT Token
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h', // Token expiry time
    });
};
// Register User and Generate Token
const registerUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = new userModels_1.default({ username, email, password });
    const user = yield userDoc.save();
    // Cast Mongoose document to UserType
    const userTyped = user.toObject();
    const token = generateToken(userTyped);
    return { user: userTyped, token };
});
exports.registerUser = registerUser;
// Login User and Validate Token
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = yield userModels_1.default.findOne({ email }).exec();
    if (!userDoc)
        throw new Error('User not found');
    const user = userDoc.toObject();
    if (user.password !== password)
        throw new Error('Invalid credentials');
    const token = generateToken(user);
    return { user, token };
});
exports.loginUser = loginUser;
// Verify Token during Login
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
