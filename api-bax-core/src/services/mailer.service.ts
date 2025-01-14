import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../lib/client";
import { sendEmail } from "../utils/mailer";
import generateOtp from "../utils/otp";

class MailerService {
    async verificationMail(req: Request, res: Response) {
        try {
            const { userId, otp } = req.body;
            if (!otp || !userId) {
                return res
                    .status(400)
                    .json({ message: "Blank option details are not allowed, please re-register" });
            }
            // Check OTP
            const userOtp = await prisma.userOtpVerification.findUnique({
                where: { userId },
            });
            if (!userOtp) {
                return res
                    .status(400)
                    .json({
                        message:
                            "Account record doesn't exist or has been verifed already.please sign up or sign in",
                    });
            }

            // exp opt checking
            if (new Date() > userOtp.expiresAt) {
                await prisma.userOtpVerification.delete({
                    where: { userId },
                });
                return res
                    .status(400)
                    .json({
                        status:"EXPIRED",
                        message: "Code has expired. Please request again.",
                    });
            }

            const validOtp = bcrypt.compare(otp, userOtp.otp);

            if (!validOtp) {
                return res
                    .status(400)
                    .json({ message: "Invalid Code passed." });
            }

            // udpdate user verifed
            await prisma.user.update({
                where: { id: userId },
                data: { verified: true },
            });

            // delete otp after verfikasi
            await prisma.userOtpVerification.delete({ where: { userId } });

            return res
                .status(200)
                .json({
                    status: "VERIFIED",
                    message: "User email verifed succesfuly",
                });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "FAILED", message: error });
        }
    }

    async resendOtp(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res
                    .status(400)
                    .json({ message: "Blank option details are not allowed, please re-register" });
            }

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        message: "User does not exist. Please sign up first.",
                    });
            }

            // delete opt 
            await prisma.userOtpVerification.deleteMany({
                where: { userId },
            });

            // create new otp
            const otp = await generateOtp(userId);
            await sendEmail(
                user.email,
                "Email Verification",
                `<p>Hi ${user.name},</p>
                            <p>Thank you for registering. In the app verify your email address and complete your registration.</p>
                            <p>Your OTP code is <b>${otp}</b>.</p>
                            <p>This code <b>expires in 60 second</b>.</p>`,
            );

            return res
                .status(200)
                .json({ message: "OTP has been resent successfully." });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: "Failed to resend OTP.", error });
        }
    }
}

export default new MailerService();
