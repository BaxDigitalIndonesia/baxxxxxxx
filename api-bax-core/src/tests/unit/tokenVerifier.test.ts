// import { Request, Response, NextFunction } from "express";
// import { setupTestDB } from "../setupTestDB";
// import { generateAccessToken } from "../../utils/jwt";
// import TokenVerifier from "../../utils/auth";

// setupTestDB();
// describe("TokenVerifier Middleware", () => {
//     let req: Partial<Request>;
//     let res: Partial<Response>;
//     let next: NextFunction;
//     const mockEmail = "test@gmail.com";

//     beforeEach(() => {
//         req = {
//             headers: {
//                 authorization: "",
//             },
//         };
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         next = jest.fn();
//     });

//     it("should call next() for valid ADMIN token", () => {
//         const adminToken = generateAccessToken("ADMIN", mockEmail);
//         req.headers!.authorization = `Bearer ${adminToken}`; // use non-null assertion

//         TokenVerifier.verifyRole("ADMIN")(
//             req as Request,
//             res as Response,
//             next,
//         );

//         expect(next).toHaveBeenCalled();
//     });

//     it("should return 401 for invalid token", () => {
//         req.headers!.authorization = "Bearer invalid-token";

//         TokenVerifier.verifyRole("ADMIN")(
//             req as Request,
//             res as Response,
//             next,
//         );

//         expect(res.status).toHaveBeenCalledWith(401);
//         expect(res.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 error: "Invalid Token",
//             }),
//         );
//     });

//     it("should return 401 if no token provided", () => {
//         TokenVerifier.verifyRole("ADMIN")(
//             req as Request,
//             res as Response,
//             next,
//         );

//         expect(res.status).toHaveBeenCalledWith(401);
//         expect(res.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 error: "Unauthorized",
//             }),
//         );
//     });

//     it("should fail for a valid token with incorrect role", () => {
//         const mentorToken = generateAccessToken("MENTOR", mockEmail);
//         req.headers!.authorization = `Bearer ${mentorToken}`;

//         TokenVerifier.verifyRole("ADMIN")(
//             req as Request,
//             res as Response,
//             next,
//         );

//         expect(res.status).toHaveBeenCalledWith(401);
//         expect(res.json).toHaveBeenCalledWith(
//             expect.objectContaining({
//                 error: "Invalid Token",
//             }),
//         );
//     });
// });
