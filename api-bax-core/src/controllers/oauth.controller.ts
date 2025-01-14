import { Request, Response } from "express";
import oauthService from "../services/oauth.service";

class OauthController {
    async login(req: Request, res: Response) {
        await oauthService.login(req, res);
    }
    async handleCalback(req: Request, res: Response) {
        await oauthService.handleCallback(req, res);
    }
}

export default new OauthController();
