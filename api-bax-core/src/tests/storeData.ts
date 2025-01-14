// import { prisma } from "../lib/client";
// import app from "../middlewares/app";
// import request from "supertest";

// export const storeData = () => {
//     beforeAll(async () => {
//         const adminRes = await request(app)
//             .post("/api/v1/auth/register/user")
//             .send({
//                 name: "Admin User Role",
//                 email: "admin@gmail.com",
//                 phone: "+6281234567890",
//                 password: "@securePassword123",
//                 role: "ADMIN",
//             });
//         expect(adminRes.status).toBe(201);

//         const mitraRes = await request(app)
//             .post("/api/v1/auth/register/user")
//             .send({
//                 name: "Mitra User Role",
//                 email: "mitra@gmail.com",
//                 phone: "+6281234567891",
//                 password: "@securePassword123",
//                 role: "MITRA",
//             });
//         expect(mitraRes.status).toBe(201);
//         expect(mitraRes.body.entity).toHaveProperty("id");

//         const referralCodeMitra = mitraRes.body.referralCode;
//         expect(referralCodeMitra).toBeDefined(); // ensure return referral code

//         const affRes = await request(app)
//             .post("/api/v1/auth/register/user")
//             .send({
//                 name: "Affiliate User Role",
//                 email: "affiliate@gmail.com",
//                 phone: "+6281234567892",
//                 password: "@securePassword123",
//                 role: "AFFILIATE",
//                 referrerId: referralCodeMitra,
//             });
//         expect(affRes.status).toBe(201);
//         const referralCodeAffiliate = affRes.body.referralCode;
//         expect(referralCodeAffiliate).toBeDefined();

//         const mentorRes = await request(app)
//             .post("/api/v1/auth/register/user")
//             .send({
//                 name: "Mentor User Role",
//                 email: "mentor@gmail.com",
//                 phone: "+6281234567893",
//                 password: "@securePassword123",
//                 role: "MENTOR",
//             });
//         expect(mentorRes.status).toBe(201);

//         const studentRes = await request(app)
//             .post("/api/v1/auth/register/user")
//             .send({
//                 name: "Student User Role",
//                 email: "student@gmail.com",
//                 phone: "+6281234567894",
//                 password: "@securePassword123",
//                 role: "STUDENT",
//             });
//         expect(studentRes.status).toBe(201);
//     });
// };
