"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
// Helper function to extract error messages from unknown types
const getErrorMessage = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred';
};
exports.getErrorMessage = getErrorMessage;
