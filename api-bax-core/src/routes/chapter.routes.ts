import { Router } from "express";
import chapterController from "../controllers/chapter.controller";
import TokenVerifier from "../utils/auth";

const chapterRouter = Router();
// Route definitions
chapterRouter.get("/chapter", chapterController.getAllChapters);
chapterRouter.get("/:id/chapter", chapterController.getChapterById);
chapterRouter.post("/chapter",TokenVerifier.verifyRole("ADMIN"), chapterController.createChapter);
chapterRouter.patch("/:id/chapter",TokenVerifier.verifyRole("ADMIN"), chapterController.updateChapter);
chapterRouter.delete("/:id/chapter",TokenVerifier.verifyRole("ADMIN"), chapterController.deleteChapter);

export default chapterRouter;
