import express from "express";
import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import router from "../routes";
// import cookieParser from "cookie-parser";

config();

const appMiddleware = express();

// Middleware configuration
appMiddleware.use(
    cors({
        origin: "https://client-bax-digital-indonesia.vercel.app",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }),
);
// appMiddleware.use(cookieParser())
appMiddleware.use(bodyParser.urlencoded({ extended: true }));
appMiddleware.use(bodyParser.json({ limit: "50mb" }));
appMiddleware.use("/api/v1", router);
export default appMiddleware;
