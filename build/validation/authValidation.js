"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const validator_1 = __importDefault(require("validator"));
// Validate signup data
const validateSignup = (req, res, next) => {
    const { username, email, password } = req.body;
    let errors = [];
    if (validator_1.default.isEmpty(username)) {
        errors.push('Username is required');
    }
    if (!validator_1.default.isEmail(email)) {
        errors.push('Invalid email address');
    }
    if (!validator_1.default.isLength(password, { min: 6 })) {
        errors.push('Password must be at least 6 characters long');
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};
exports.validateSignup = validateSignup;
// Validate login data
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    if (!validator_1.default.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    next();
};
exports.validateLogin = validateLogin;
