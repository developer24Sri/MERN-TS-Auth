"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./misc/constants");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
//Middlewares:
app.use(cors());
app.use(express_1.default.json());
//Routes
app.use("/", userRoutes_1.default);
//Database connection:
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log(constants_1.serverrun))
    .catch((err) => console.log('Error connecting to MongoDB:', err));
// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
