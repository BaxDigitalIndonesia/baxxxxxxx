import { Request, Response } from "express";
import forgotAndResetService from "../services/forgotAndReset.service";

class ForgotAndRessetController {
    async sendForgot(req: Request, res: Response) {
        await forgotAndResetService.sendForgot(req,res);
    }
    async sendReset(req: Request, res: Response) {
        await forgotAndResetService.sendReset(req,res);
    }
}

export default new ForgotAndRessetController();
