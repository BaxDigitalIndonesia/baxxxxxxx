// import request from "supertest";
// import app from "../../middlewares/app";
// import { setupTestDB } from "../setupTestDB";
// import { storeData } from "../storeData";

// setupTestDB();
// storeData();

// describe("User API Integrations Tests", () => {
//     let adminToken: string;
//     let mitraToken: string;
//     let affiliateToken: string;
//     let mentorToken: string;
//     let studentToken: string;

//     let referralCodeMitra: string;
//     let adminId: string;
//     let mitraId: string;
//     let affiliateId: string;
//     let mentorId: string;
//     let studentId: string;

//     beforeAll(async () => {
//         const adminRes = await request(app).post("/api/v1/auth/login").send({
//             email: "admin@gmail.com",
//             password: "@securePassword123",
//         });
//         adminToken = adminRes.body.accessToken;
//         adminId = adminRes.body.id;

//         const mitraRes = await request(app).post("/api/v1/auth/login").send({
//             email: "mitra@gmail.com",
//             password: "@securePassword123",
//         });
//         mitraToken = mitraRes.body.accessToken;
//         mitraId = mitraRes.body.id;
//         referralCodeMitra = mitraRes.body.referralCode;
//         // expect(referralCodeMitra).toBeDefined();

//         const affRes = await request(app).post("/api/v1/auth/login").send({
//             email: "affiliate@gmail.com",
//             password: "@securePassword123",
//         });
//         affiliateToken = affRes.body.accessToken;
//         affiliateId = affRes.body.id;

//         const mentorRes = await request(app).post("/api/v1/auth/login").send({
//             email: "mentor@gmail.com",
//             password: "@securePassword123",
//         });
//         mentorToken = mentorRes.body.accessToken;
//         mentorId = mentorRes.body.id;

//         const studentRes = await request(app).post("/api/v1/auth/login").send({
//             email: "student@gmail.com",
//             password: "@securePassword123",
//         });
//         studentToken = studentRes.body.accessToken;
//         studentId = studentRes.body.id;
//     });

//     describe("GET /users", () => {
//         it("should return 401 if no token is provided", async () => {
//             const res = await request(app).get("/users");
//             expect(res.status).toBe(401);
//             expect(res.body.message).toBe("Unauthorized");
//         });

//         it("should return 403 if the user is not an admin", async () => {
//             const res = await request(app)
//                 .get("/users")
//                 .set(
//                     "Authorization",
//                     `Bearer ${mitraToken || affiliateToken || mentorToken || studentToken}`,
//                 );

//             expect(res.status).toBe(403);
//             expect(res.body.message).toBe("Access Denied");
//         });

//         it("should return paginated list of users for admin", async () => {
//             const res = await request(app)
//                 .get("/users?page=1&limit=10")
//                 .set("Authorization", `Bearer ${adminToken}`);

//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("data");
//             expect(res.body.data).toHaveLength(10); // Assuming there are 10 users
//         });

//         it("should return paginated list of user affiliate for mitra", async () => {
//             const res = await request(app)
//                 .get("/users?page=1&limit=10")
//                 .set("Authorization", `Bearer ${mitraToken}`);

//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("data");
//             expect(res.body.data).toHaveLength(10);
//         });

//         // add for mitra get affiliate data with relationship
//     });

//     // Get By ID
//     describe("GET /users/:id", () => {
//         // it("should allow admin to get any user's data", async () => {
//         //     const userRes = await request(app)
//         //         .get(`/users/${adminId}`)
//         //         .set("Authorization", `Bearer ${adminToken}`);

//         //     expect(userRes.status).toBe(200);
//         //     expect(userRes.body).toHaveProperty("id", adminId);
//         // });

//         // it("should allow user role mitra to get their own data", async () => {
//         //     const userRes = await request(app)
//         //         .get(`/users/${mitraId}`)
//         //         .set("Authorization", `Bearer ${mitraId}`);

//         //     expect(userRes.status).toBe(200);
//         //     expect(userRes.body).toHaveProperty("id", mitraId);
//         // });

//         it("should allow user role mitra to get any affiliate data with their relationship", async () => {
//             const userRes = await request(app)
//                 .get(`/users/${affiliateId}`)
//                 .set("Authorization", `Bearer ${mitraId}`);

//             expect(userRes.status).toBe(200);
//             expect(userRes.body).toHaveProperty("id", affiliateId);
//             expect(userRes.body.referrerId).toBe(referralCodeMitra);
//         });

//         it("should forbid non-admin users from accessing other users' data", async () => {
//             const res = await request(app)
//                 .get("/users/1")
//                 .set("Authorization", `Bearer ${affiliateId}`);

//             expect(res.status).toBe(403);
//             expect(res.body.message).toBe("Forbidden: Access denied");
//         });
//     });

//     // describe("DELETE /users/:id", () => {
//     //     it("must be  deleted user by ID", async () => {
//     //         const signupRes = await request(app).post("/auth/signin").send({
//     //             email: "test@example.com",
//     //             password: "securePassword123",
//     //         });

//     //         const userId = signupRes.body.id;
//     //         const deleteRes = await request(app)
//     //             .delete(`/users/${userId}`)
//     //             .send();

//     //         expect(deleteRes.status).toBe(200);
//     //         expect(deleteRes.body.message).toBe("User deleted successfully");
//     //     });
//     // });
// });

// // import request from "supertest";
// // import app from "../../middlewares/app";
// // import { setupTestDB } from "../setupTestDB";

// // setupTestDB();

// // describe("User API Integration Tests", () => {
// //     let adminToken: string;
// //     let userToken: string;

// //     beforeAll(async () => {
// //         // Buat user dengan role admin
// //         const adminRes = await request(app).post("/auth/signup").send({
// //             name: "Admin User",
// //             email: "admin@example.com",
// //             password: "secureAdmin123",
// //             role: "ADMIN",
// //         });

// //         adminToken = adminRes.body.accessToken;

// //         // Buat user biasa
// //         const userRes = await request(app).post("/auth/signup").send({
// //             name: "Regular User",
// //             email: "user@example.com",
// //             password: "secureUser123",
// //             role: "USER",
// //         });

// //         userToken = userRes.body.accessToken;
// //     });

// //     describe("GET /users", () => {
// //         it("should return 401 if no token is provided", async () => {
// //             const res = await request(app).get("/users");
// //             expect(res.status).toBe(401);
// //             expect(res.body.message).toBe("Authorization token is required");
// //         });

// //         it("should return 403 if the user is not an admin", async () => {
// //             const res = await request(app)
// //                 .get("/users")
// //                 .set("Authorization", `Bearer ${userToken}`);

// //             expect(res.status).toBe(403);
// //             expect(res.body.message).toBe("Forbidden: Admin access required");
// //         });

// //         it("should return paginated list of users for admin", async () => {
// //             const res = await request(app)
// //                 .get("/users?page=1&limit=10")
// //                 .set("Authorization", `Bearer ${adminToken}`);

// //             expect(res.status).toBe(200);
// //             expect(res.body).toHaveProperty("data");
// //             expect(res.body.data).toHaveLength(10); // Assuming there are 10 users
// //         });
// //     });

// //     describe("GET /users/:id", () => {
// //         it("should allow admin to get any user's data", async () => {
// //             const userRes = await request(app)
// //                 .get("/users/1")
// //                 .set("Authorization", `Bearer ${adminToken}`);

// //             expect(userRes.status).toBe(200);
// //             expect(userRes.body).toHaveProperty("id", 1);
// //         });

// //         it("should allow user to get their own data", async () => {
// //             const userRes = await request(app)
// //                 .get("/users/2")
// //                 .set("Authorization", `Bearer ${userToken}`);

// //             expect(userRes.status).toBe(200);
// //             expect(userRes.body).toHaveProperty("id", 2);
// //         });

// //         it("should forbid non-admin users from accessing other users' data", async () => {
// //             const res = await request(app)
// //                 .get("/users/1")
// //                 .set("Authorization", `Bearer ${userToken}`);

// //             expect(res.status).toBe(403);
// //             expect(res.body.message).toBe("Forbidden: Access denied");
// //         });
// //     });

// //     describe("DELETE /users/:id", () => {
// //         it("should allow admin to delete any user", async () => {
// //             const deleteRes = await request(app)
// //                 .delete("/users/2")
// //                 .set("Authorization", `Bearer ${adminToken}`);

// //             expect(deleteRes.status).toBe(200);
// //             expect(deleteRes.body.message).toBe("User deleted successfully");
// //         });

// //         it("should allow users to delete their own account", async () => {
// //             const deleteRes = await request(app)
// //                 .delete("/users/2")
// //                 .set("Authorization", `Bearer ${userToken}`);

// //             expect(deleteRes.status).toBe(200);
// //             expect(deleteRes.body.message).toBe("User deleted successfully");
// //         });

// //         it("should forbid non-admin users from deleting other users' accounts", async () => {
// //             const deleteRes = await request(app)
// //                 .delete("/users/1")
// //                 .set("Authorization", `Bearer ${userToken}`);

// //             expect(deleteRes.status).toBe(403);
// //             expect(deleteRes.body.message).toBe("Forbidden: Access denied");
// //         });
// //     });

// //     describe("PATCH /users/:id", () => {
// //         it("should allow admin to update any user's data", async () => {
// //             const updateRes = await request(app)
// //                 .patch("/users/2")
// //                 .set("Authorization", `Bearer ${adminToken}`)
// //                 .send({ name: "Updated User" });

// //             expect(updateRes.status).toBe(200);
// //             expect(updateRes.body.message).toBe("User updated successfully");
// //         });

// //         it("should allow users to update their own data", async () => {
// //             const updateRes = await request(app)
// //                 .patch("/users/2")
// //                 .set("Authorization", `Bearer ${userToken}`)
// //                 .send({ name: "User's New Name" });

// //             expect(updateRes.status).toBe(200);
// //             expect(updateRes.body.message).toBe("User updated successfully");
// //         });

// //         it("should forbid non-admin users from updating other users' data", async () => {
// //             const updateRes = await request(app)
// //                 .patch("/users/1")
// //                 .set("Authorization", `Bearer ${userToken}`)
// //                 .send({ name: "Unauthorized Update" });

// //             expect(updateRes.status).toBe(403);
// //             expect(updateRes.body.message).toBe("Forbidden: Access denied");
// //         });
// //     });
// // });
