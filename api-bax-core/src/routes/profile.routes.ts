import { Router } from "express";
import profileController from "../controllers/profile.controller";
import { upload } from "../middlewares/multerConfig";
import TokenVerifier from "../utils/auth";

const profileRouter = Router();

// Define profile routes
profileRouter.get("/profile",TokenVerifier.verifyRoleToken(), profileController.getProfile);
profileRouter.patch("/profile",TokenVerifier.verifyRoleToken(), upload('photo'), profileController.upsertProfile);

export default profileRouter;
