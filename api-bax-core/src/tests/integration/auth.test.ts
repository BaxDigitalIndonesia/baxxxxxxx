// import request from "supertest";
// import app from "../../middlewares/app";
// import { setupTestDB } from "../setupTestDB";

// setupTestDB();
// describe("Auth API Integration Tests", () => {
//     describe("POST /api/v1/auth/register/user", () => {
//         it("must be return 201 if user successfully created", async () => {
//             const res = await request(app)
//                 .post("/api/v1/auth/register/user")
//                 .send({
//                     name: "Admin User Role",
//                     email: "admin@gmail.com",
//                     phone: "+6281234567890",
//                     password: "@securePassword123",
//                     role: "ADMIN",
//                 });
//             expect(res.status).toBe(201);
//             expect(res.body.entity).toHaveProperty("id");
//             expect(res.body.entity).toHaveProperty("name", "Admin User Role");
//             expect(res.body.entity).toHaveProperty("email", "admin@gmail.com");
//             expect(res.body.entity).toHaveProperty("phone", "+6281234567890");
//             expect(res.body.entity).toHaveProperty("role", "ADMIN");
//         });

//         it("must be return 400 if name, email, phone or password is missing", async () => {
//             const res = await request(app)
//                 .post("/api/v1/auth/register/user")
//                 .send({
//                     name: "",
//                     email: "",
//                     phone: "",
//                     password: "",
//                     role: "ADMIN",
//                 });

//             expect(res.status).toBe(400);
//             expect(res.body.message).toBe("Validation error");
//             expect(res.body.details).toEqual(
//                 expect.arrayContaining([
//                     expect.stringContaining("Name cannot be empty"),
//                     expect.stringContaining("Phone cannot be empty"),
//                     expect.stringContaining("Email cannot be empty"),
//                     expect.stringContaining("Password cannot be empty"),
//                 ]),
//             );
//         });
//     });

//     describe("POST /api/v1/auth/login", () => {
//         it("must be return 200 dan token if credential valid", async () => {
//             await request(app).post("/api/v1/auth/register/user").send({
//                 name: "Admin User Role",
//                 email: "admin@gmail.com",
//                 phone: "+6281234567890",
//                 password: "@securePassword123",
//                 role: "ADMIN",
//             });

//             const res = await request(app).post("/api/v1/auth/login").send({
//                 email: "admin@gmail.com",
//                 password: "@securePassword123",
//             });
//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("accessToken");
//         });

//         it("must be return 401 if credential invalid", async () => {
//             await request(app).post("/api/v1/auth/register/user").send({
//                 name: "Admin User Role",
//                 email: "admin@gmail.com",
//                 phone: "+6281234567890",
//                 password: "@securePassword123",
//                 role: "ADMIN",
//             });
//             const res = await request(app).post("/api/v1/auth/login").send({
//                 email: "test@gmail.com",
//                 password: "@wrongPassword123",
//             });

//             // console.log(res.body);
//             expect(res.status).toBe(401);
//             expect(res.body.message).toBe("wrong email or password");
//         });
//     });
// });
