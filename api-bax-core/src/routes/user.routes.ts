import { Router } from "express";
import userController from "../controllers/user.controller";
import TokenVerifier from "../utils/auth";

const userRouter = Router();

//read
userRouter.get("/user",TokenVerifier.verifyRoleToken(), userController.get);
//update
userRouter.patch("/user/:id",TokenVerifier.verifyRole("ADMIN"), userController.patch);
//deleted
userRouter.delete("/user/:id",TokenVerifier.verifyRole("ADMIN"), userController.delete);

export default userRouter;
