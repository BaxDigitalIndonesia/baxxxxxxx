import http from "http";
import { config } from "dotenv";
import app from "./middlewares/app";
config();

const httpServer = http.createServer(app);
const host = process.env.APP_URL;
const port = process.env.PORT;

const startServer = async () => {
    try {
        httpServer.listen(port, () =>
            console.log(`Server started on ${host}`),
        );
    } catch (error) {
        console.error("Internal Server Error", error);
        process.exit(1);
    }
};

startServer();

// import express from "express";
// import {Request,Response} from "express";
// import "dotenv/config"
// import router from "./routes";

// const app = express();

// const port = process.env.PORT;
//     const startServer = async () => {
//     try {
//     app.use(express.json());
//     app.use("/api/v1",router);

//     app.get("/",(req:Request,res:Response) => {
//         res.send("hello world");
//     });
//     app.listen(port,()=>{
//         console.log(`server is running on localhost:${port}`)
//     })

//     } catch (error) {
//         console.error("Internal Server Error", error);
//         process.exit(1);
//     }
// };

// startServer();