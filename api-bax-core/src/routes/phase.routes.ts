import { Router } from "express";
import phaseController from "../controllers/phase.controller";
import TokenVerifier from "../utils/auth";

const phaseRouter = Router();

phaseRouter.get("/phase", phaseController.getAllPhases);
phaseRouter.get("/:id/phase", phaseController.getPhaseById);
phaseRouter.post("/phase",TokenVerifier.verifyRole("ADMIN"), phaseController.createPhase);
phaseRouter.patch("/:id/phase",TokenVerifier.verifyRole("ADMIN"), phaseController.updatePhase);
phaseRouter.delete("/:id/phase",TokenVerifier.verifyRole("ADMIN"), phaseController.deletePhase);

export default phaseRouter;
