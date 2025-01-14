import { Router } from "express";
import lessonController from "../controllers/lesson.controller";
import TokenVerifier from "../utils/auth";
import { upload, uploadLesson } from "../middlewares/multerConfig";

const lessonoRouter = Router();

// Route lesson definitions
lessonoRouter.get("/lesson", lessonController.getAllLessons);
lessonoRouter.get("/:id/lesson", lessonController.getLessonById);
lessonoRouter.post("/lesson",TokenVerifier.verifyRole("ADMIN"),uploadLesson("image","video"),lessonController.createLesson);
lessonoRouter.patch("/:id/lesson",TokenVerifier.verifyRole("ADMIN"),uploadLesson("image","video"), lessonController.updateLesson);
lessonoRouter.delete("/:id/lesson",TokenVerifier.verifyRole("ADMIN"), lessonController.deleteLesson);

export default lessonoRouter;
