import { Router } from "express";
import oauthController from "../controllers/oauth.controller";

const oauthRouter = Router();
oauthRouter.get('/google',oauthController.login)
oauthRouter.get('/google/callback',oauthController.handleCalback)
export default oauthRouter;
