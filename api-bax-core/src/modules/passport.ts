import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../lib/client";
import jwt from "jsonwebtoken";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
           callbackURL: `${process.env.GOOGLE_CLIENT_CALLBACK}/api/v1/auth/google/callback`,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any,
        ) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        googleId: profile.id,
                    },
                });
            } catch (error) {
                done(error);
            }
        },
    ),
);
