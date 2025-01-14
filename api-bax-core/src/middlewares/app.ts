import express from "express";
import appMiddleware from "./appMiddleware";

const app = express();

app.use(appMiddleware);

export default app;