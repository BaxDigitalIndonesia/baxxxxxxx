import bcrypt from "bcrypt";
import { prisma } from "../lib/client";

export default async function generateOtp(userId: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // OTP 6 digit
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + 15 * 60000); //15 second
    //hash the otp
    const saltRound = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRound);

    await prisma.userOtpVerification.create({
        data: {
            userId,
            otp: hashedOTP,
            createdAt,
            expiresAt,
        },
    });

    return otp;
}
