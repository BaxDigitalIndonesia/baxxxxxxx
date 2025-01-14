import crypto from "crypto";

/**
 * Generates a referral code based on the given model name and username.
 * @param role the name of the model to generate the referral code for
 * @param userName the username to include in the referral code
 * @returns a string representing the referral code
 */
export const generateReferralCode = (
    role: string,
    userName: string,
): string => {
    const firstName = userName.split(" ")[0];
    const sanitizedModelName =
        role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    const sanitizedUserName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    const uniqueCode = crypto.randomInt(100000, 999999).toString();
    return `${sanitizedModelName}${sanitizedUserName}${uniqueCode}`;
};
