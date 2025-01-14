// import { RoleName } from "../../types";
// import { generateAccessToken, verifyAccessToken } from "../../utils/jwt";

// describe("JWT Utility Functions", () => {
//     const roles: RoleName[] = [
//         "ADMIN",
//         "MITRA",
//         "AFFILIATE",
//         "MENTOR",
//         "STUDENTS",
//         "CUSTOMER",
//     ];
//     const mockEmail = "test@example.com";

//     it("should generate a valid token for each role", () => {
//         roles.forEach((role) => {
//             const token = generateAccessToken(role, mockEmail);
//             expect(typeof token).toBe("string");
//             expect(token.length).toBeGreaterThan(10);
//         });
//     });

//     it("should verify a valid token for correct roles", () => {
//         roles.forEach((role) => {
//             const token = generateAccessToken(role, mockEmail);
//             const decoded = verifyAccessToken(token, role);
//             expect(decoded).not.toBeNull();
//             expect(decoded.role).toBe(role);
//             expect(decoded.email).toBe(mockEmail);
//         });
//     });

//     it("should fail to verify a token with incorrect role", () => {
//         const adminToken = generateAccessToken("ADMIN", mockEmail);
//         const decoded = verifyAccessToken(adminToken, "STUDENTS");
//         expect(decoded).toBeNull();
//     });

//     it("should return null for an invalid or expired token", () => {
//         const invalidToken = "some-invalid-token";
//         const decoded = verifyAccessToken(invalidToken, "ADMIN");
//         expect(decoded).toBeNull();
//     });
// });
