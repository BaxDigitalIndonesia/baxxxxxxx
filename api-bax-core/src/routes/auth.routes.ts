import { Router } from "express";
import authController from "../controllers/auth.controller";
import mailerController from "../controllers/mailer.controller";
import forgotAndResetController from "../controllers/forgotAndReset.controller";

const authRouter = Router();

// Sign up router
authRouter.post("/register/user", authController.createUser);
authRouter.post("/register/mitra", authController.createMitra);
authRouter.post("/register/affiliate", authController.createAffiliate);
authRouter.post("/register/mentor", authController.createLecturer);
authRouter.post("/register/students", authController.createStudent);

// Sign up updated router
authRouter.patch("/register/user", authController.updateUser);
authRouter.patch("/register/mitra", authController.updateMitra);
authRouter.patch("/register/affiliate", authController.updateAffiliate);
authRouter.patch("/register/mentor", authController.updateLecturer);
authRouter.patch("/register/student", authController.updateStudent);

// Sign in router
authRouter.post("/login", authController.signInUser);
authRouter.post("/verify-email", mailerController.verificationMail);
authRouter.post("/resend-email", mailerController.resendOtp);


//reset password
authRouter.post("/forgot-password",forgotAndResetController.sendForgot);
authRouter.post("/reset-password/:token", forgotAndResetController.sendReset);

export default authRouter;
