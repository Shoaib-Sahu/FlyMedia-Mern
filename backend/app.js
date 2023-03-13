import express from "express";
import bodyParser from "body-parser";
import authRoute from "./Routes/AuthRoute.js";
import userRoute from "./Routes/UserRoute.js";
import postRoute from "./Routes/PostRoute.js";
import uploadRoute from "./Routes/UploadRoute.js";
import chatRoute from "./Routes/ChatRoute.js";
import messageRoute from './Routes/MessageRoute.js';
import cors from 'cors'
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// to serve images inside public folder
app.use(express.static('public'));
app.use("/images", express.static("images"));

// Import Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use("/post", postRoute);
app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

export default app;