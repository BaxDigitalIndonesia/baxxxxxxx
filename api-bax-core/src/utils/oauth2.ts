import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SCREET,
    process.env.GOOGLE_CLIENT_CALLBACK,

);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];

export function generateAuthUrl(roles: string) {
    const state = JSON.stringify({ roles });

    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        include_granted_scopes: true,
        state,
    });
}
//  export const authUrl = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: scopes,
//     include_granted_scopes: true,
//     state:staterole
// });
