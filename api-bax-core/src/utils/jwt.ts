import { RoleName } from "../types";
import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

const JWT_SECRETS: Record<RoleName, string> = {
    ADMIN: process.env.JWT_SECRET_ADMIN as string,
    MITRA: process.env.JWT_SECRET_MITRA as string,
    AFFILIATE: process.env.JWT_SECRET_AFFILIATE as string,
    MENTOR: process.env.JWT_SECRET_MENTOR as string,
    STUDENTS: process.env.JWT_SECRET_STUDENT as string,
    CUSTOMER: process.env.JWT_SECRET_CUSTOMER as string,
};
export const generateAccessToken = (
    id: string,
    role: RoleName,
    email: string,
    name: string,
): string => {
    const payload = { id, role, email, name };
    const expiresIn = role === "ADMIN" ? "1h" : "2h";
    const secret = JWT_SECRETS[role];
    if (!secret) {
        throw new Error(`JWT secret for role ${role} not configured`);
    }

    const accessToken = jwt.sign(payload, secret, {
        expiresIn,
        issuer: process.env.APP_URL,
    });
    return accessToken;
};

export const verifyAccessToken = (token: string, role: RoleName): any => {
    try {
        const secret = JWT_SECRETS[role];
        if (!secret) {
            throw new Error(`JWT secret for role ${role} not configured`);
        }

        const decoded = jwt.verify(token, secret);
        if (typeof decoded === "object" && "role" in decoded) {
            if (decoded.role === role) {
                return decoded;
            }
        }
        return null;
    } catch (error) {
        return null;
    }
};
