import { prisma } from "../lib/client";
import { Request, Response } from "express";
import errorHandling from "../utils/errorHandling";
import { decrypt, encrypt } from "../utils/bcrypt";
import { generateReferralCode } from "../utils/referralCode";
import { generateAccessToken } from "../utils/jwt";
import { Login, Register, RoleName, UpdatedRegister } from "../types";
import { sendEmail } from "../utils/mailer";
import generateOtp from "../utils/otp";

class AuthService {
    async createAuthSignUpEntity(
        res: Response,
        payload: Register,
        role: RoleName,
    ) {
        try {
            // console.log(payload);
            if (!role.includes(payload.role.toUpperCase() as RoleName)) {
                return res.status(400).json({
                    message: "Invalid role provided",
                });
            }
            const findUser = await prisma.user.findUnique({
                where: { email: payload.email },
            });
            if (findUser) {
                return res.status(400).json({
                    message: "user already exist",
                });
            }

            const hashPassword = encrypt(payload.password);
            const referralCode = generateReferralCode(role, payload.name);

            const newEntity = await prisma.user.create({
                data: {
                    ...payload,
                    password: hashPassword,
                    role: payload.role.toUpperCase() as RoleName, // ensure role format type is upper case
                    referralCode,
                    verified: false,
                },
            });
            const otp = await generateOtp(newEntity.id);
            //console.log("otp",otp);

            await sendEmail(
                newEntity.email,
                "Email Verification",
                `<p>Hi ${newEntity.name},</p>
                 <p>Thank you for registering. In the app verify your email address and complete your registration.</p>
                 <p>Your OTP code is <b>${otp}</b>.</p>
                 <p>This code <b>expires in 60 second</b>.</p>`,
            );
            const { password, ...sanitizedData } = newEntity;

            return res.status(201).json({
                message: `Successfully added ${role}: ${newEntity.name}`,
                entity: sanitizedData,
            });
        } catch (error) {
            errorHandling.handle(
                res,
                error,
                "Something went wrong when creating entity",
            );
        }
    }
    async updateAuthSignUpEntity(
        res: Response,
        payload: UpdatedRegister,
        role: RoleName,
    ) {
        try {
            // console.log(payload);

            if (!role.includes(payload.role as RoleName)) {
                return res.status(400).json({
                    message: "Invalid role provided",
                });
            }

            const hashPassword = encrypt(payload.password);
            const checkUser = await prisma.user.findUnique({
                where: {
                    email: payload.email,
                },
            });

            if (!checkUser) {
                return res.status(401).json("User not found,please register first");
            }
            const referralCode = generateReferralCode(
                role,
                checkUser?.name as string,
            );

            const newEntity = await prisma.user.update({
                where: {
                    email: payload.email,
                },
                data: {
                    phone: payload.phone,
                    password: hashPassword,
                    referralCode,
                    verified: true,
                },
            });

            
            const { password, ...sanitizedData } = newEntity;

            const accessToken = generateAccessToken(
                newEntity.id,
                newEntity.role,
                newEntity.email,
                newEntity.name,
            );
  
            // Set token in cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true, // Prevent access from JavaScript
                secure: true, // Only send via HTTPS
                sameSite: "none", // Prevent CSRF attacks
                maxAge: 60 * 60 * 1000, // 1 hour
            });
            res.cookie("referalCode", sanitizedData.referralCode, {
                httpOnly: true, // Prevent access from JavaScript
                secure: true, // Only send via HTTPS
                sameSite: "none", // Prevent CSRF attacks
                maxAge: 60 * 60 * 1000, // 1 hour
            });
            return res.status(201).json({
                message: `Successfully Updated User : ${newEntity.name}`,
                entity: sanitizedData,
            });
        } catch (error) {
            errorHandling.handle(
                res,
                error,
                "Something went wrong when creating entity",
            );
        }
    }

    async createAuthSignInEntity(res: Response, payload: Login) {
        try {
            if(!payload.email && !payload.password){
                return res.status(400).json({
                    message: "email or password not is empty",
                });
            }
            const dataAuth = await prisma.user.findUnique({
                where: {
                    email: payload.email,
                },
            });

            if (!dataAuth) {
                return res.status(401).json({
                    message: "wrong email or password",
                });
            }

            const isValidPassword =
                dataAuth.password !== null
                    ? decrypt(payload.password, dataAuth.password)
                    : false;
            if (!isValidPassword) {
                return res.status(401).json({
                    message: "wrong email or password",
                });
            }

            const accessToken = generateAccessToken(
                dataAuth.id,
                dataAuth.role,
                dataAuth.email,
                dataAuth.name,
            );
            const { password, ...credentialData } = dataAuth;
            // Set token in cookie
            res.cookie("accessToken", accessToken, {
               
                httpOnly: true, 
                secure: true, 
                sameSite: "none", 
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("referalCode", credentialData.referralCode, {
              
                httpOnly: true, 
                secure: true, 
                sameSite: "none", 
                maxAge: 24 * 60 * 60 * 1000,
            });
            console.log(res.getHeaders()['set-cookie']);
           
            return res.status(200).json({
                message: "Successfully signed in",
                user: credentialData,
            });
            // return res.status(200).json({
            //     message: "Successfully signed in",
            //     user: credentialData,
            //     redirectUrl: `http://localhost:3000/dashboard/overview?user=${encodeURIComponent(dataAuth.email)}`,
            // });
        } catch (error) {
            errorHandling.handle(
                res,
                error,
                "Something went wrong when sign in",
            );
        }
    }
}

export default new AuthService();
