import bcrypt from "bcrypt";

import { Request, Response } from "express";
import { sendEmail } from "../utils/mailer";
import { prisma } from "../lib/client";
import crypto from "crypto";
import { encrypt } from "../utils/bcrypt";

class ForgotAndResetService {
    async sendForgot(req: Request, res: Response) {
       
        try {
            const { email } = req.body;
            // check the email value
            if (!email) {
                return res.status(404).json({ message: "Email not found" });
            }
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "Email not found" });
            }

            // Generate token
            const resetToken = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");
            const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); //  10 menit

            // save token and expired token
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    passwordResetToken: hashedToken,
                    passwordResetExpires: tokenExpiry,
                },
            });

            // Kirim email
            const resetURL = `${process.env.VERIFY_LINK_FE}/auth/reset-password?token=${resetToken}`;

            const message = `Click the following link to reset your password:\n\n${resetURL}`;
            await sendEmail(user.email, "Password Reset Request", message);

          return  res.status(200).json({ message: "Reset link sent to email!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async sendReset(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;

        try {
            //hashed token
            const hashedToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");

            //find user by tokken
            const user = await prisma.user.findFirst({
                where: {
                    passwordResetToken: hashedToken,
                    passwordResetExpires: { gt: new Date() }, //token not expired
                },
            });

            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Token invalid or expired" });
            }

            // Hash new password
            const hashedPassword = encrypt(password);
            // Perbarui password dan hapus token reset
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                    passwordResetToken: null,
                    passwordResetExpires: null,
                },
            });

            return res
                .status(200)
                .json({ message: "Password has been reset!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new ForgotAndResetService();
