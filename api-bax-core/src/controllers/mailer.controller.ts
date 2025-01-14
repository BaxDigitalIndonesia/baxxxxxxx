import { Request, Response } from "express";
import mailerService from "../services/mailer.service";

class MailerController {
    async verificationMail(req: Request, res: Response) {
        await mailerService.verificationMail(req, res);
    }
    async resendOtp(req: Request, res: Response) {
        await mailerService.resendOtp(req, res);
    }
}

export default new MailerController();
