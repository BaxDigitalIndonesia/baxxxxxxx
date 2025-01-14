import { Request, Response } from "express";
import { google } from "googleapis/build/src";
import { prisma } from "../lib/client";
import { generateAccessToken } from "../utils/jwt";
import { generateAuthUrl, oauth2Client } from "../utils/oauth2";

const receivedSecretKey = process.env.SECURE_KEY;
const frontEndUrl = "https://bax-affiliate-v2.vercel.app";
// const frontEndUrl = process.env.FRONTEND_URL;

function isValidBase64(str: string): boolean {
    // RegEx base64
    const base64Regex = /^[A-Za-z0-9+/=]+$/;

    // Cek long validation
    return base64Regex.test(str) && str.length % 4 === 0;
}

class OauthService {
    async login(req: Request, res: Response) {
        try {
            const { roles } = req.query;

            return res.redirect(generateAuthUrl(roles as string));
        } catch (error) {
            return res.status(400).json(`something wrong error ${error}`);
        }
    }
    async handleCallback(req: Request, res: Response) {
        try {
            const { code, state } = req.query;

            if (!code || !state) {
                return res
                    .status(400)
                    .json({ error: "Authorization code or state is missing" });
            }

            // Decode state
            const parsedState = state ? JSON.parse(state as string) : {};

            if (!parsedState.roles || !isValidBase64(parsedState.roles)) {
                return res
                    .status(404)
                    .json({ error: "Invalid a bad request occurs" });
            }
            // Decode roles base64
            const decodeState = Buffer.from(
                parsedState.roles,
                "base64",
            ).toString("utf-8");

            const decodedjson = JSON.parse(decodeState);
            const { payload, secretKey } = decodedjson;

            if (receivedSecretKey !== secretKey) {
                return res.status(404).json({ error: "Invalid Authorization" });
            }

            if (!payload) {
                return res.status(400).json({ error: "Missing payload" });
            }

            const decodedPayload = JSON.parse(payload);
            const { roles } = decodedPayload;

            const encodeRole = roles ? roles.toUpperCase() : "";

            // console.log(parsedState.roles, encodeRole, roles, decodedPayload);

            if (!encodeRole.includes(encodeRole as RoleName)) {
                return res.status(400).json({
                    message: "Invalid role provided",
                });
            }

            // const { tokens } = await oauth2Client.getToken(code as string);
            // oauth2Client.setCredentials(tokens);

            // const ouath2 = google.oauth2({
            //     auth: oauth2Client,
            //     version: "v2",
            // });

            // const { data } = await ouath2.userinfo.get();

            // if (!data?.email || !data?.name) {
            //     res.status(400).json("user not found");
            // }

            // Debug
            let tokens;
            try {
                const tokenResponse = await oauth2Client.getToken(code as string);
                tokens = tokenResponse.tokens;
            } catch (err) {
                // console.error("Error exchanging code for tokens:", err.response?.data || err.message);
                return res.status(400).json({ error: "Failed to get tokens from Google" });
            }

            oauth2Client.setCredentials(tokens);

            // Fetch user info from Google
            const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
            const { data } = await oauth2.userinfo.get();

            if (!data.email || !data.name) {
                return res.status(400).json({ error: "User info not found" });
            }
            // End Debug
            
            const user = await prisma.user.findUnique({
                where: { email: data.email as string },
            });

            if (!user) {
                //if user not found register
                const createUser = await prisma.user.create({
                    data: {
                        name: data.name as string,
                        email: data.email as string,
                        phone: null,
                        role: encodeRole as RoleName,
                        googleId: data.id as string,
                    },
                });
                if (createUser?.email) {
                    const encodedState = Buffer.from(createUser.role).toString(
                        "base64",
                    );

                    return res.redirect(
                        `${frontEndUrl}/auth/update?email=${encodeURIComponent(createUser.email)}&state=${encodedState}`,
                    );
                } else {
                    return res
                        .status(500)
                        .json({ error: "error bad request." });
                }
            } else {
                // updated if user create manualy
                const updateUser = await prisma.user.update({
                    where: { email: data.email as string },
                    data: {
                        googleId: data.id,
                    },
                });
                //login
                const token = generateAccessToken(
                    user.id,
                    user.role,
                    user.email,
                    user.name,
                );

                // console.log({ token, user, updateUser });

                return res.redirect(
                    `${frontEndUrl}/auth/callback?token=${token}`,
                );
            }
        } catch (error) {
            console.error("Callback error:", error);
            return res.status(500).json({ message: "An error occurred", error });
        }
    }
}

export default new OauthService();
