"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const authService_1 = require("../services/authService");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (token == null)
        return res.sendStatus(401); // If no token, unauthorized
    try {
        const payload = (0, authService_1.verifyToken)(token); // Cast to JwtPayload
        req.user = { _id: payload.id, email: payload.email, username: '', password: '' }; // Ensure to provide all UserType properties
        next(); // Proceed to next middleware or route handler
    }
    catch (err) {
        res.sendStatus(403); // Forbidden if token is invalid
    }
};
exports.authenticateToken = authenticateToken;
