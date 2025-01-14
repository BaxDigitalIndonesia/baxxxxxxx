import { Router } from "express";
import mentorController from "../controllers/mentor.controller";
import TokenVerifier from "../utils/auth";

const mentorRouter = Router();
// Mentor routes
mentorRouter.post("/mentor",TokenVerifier.verifyRole("ADMIN"), mentorController.createMentor);
mentorRouter.get("/mentor", mentorController.getAllMentors);
mentorRouter.get("/mentor/:mentorId", mentorController.getMentorById);
mentorRouter.put("/mentor/:mentorId",TokenVerifier.verifyRole("ADMIN"), mentorController.updateMentor);
mentorRouter.delete("/mentor/:mentorId",TokenVerifier.verifyRole("ADMIN"), mentorController.deleteMentor);

export default mentorRouter;
