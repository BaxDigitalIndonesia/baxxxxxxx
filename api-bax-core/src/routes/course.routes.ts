import { Router } from "express";
import courseController from "../controllers/course.controller";
import TokenVerifier from "../utils/auth";

const courseRouter = Router();

courseRouter.get("/course", courseController.getAllCourses);
courseRouter.get("/course/:id", courseController.getCourseById);
courseRouter.post("/course",TokenVerifier.verifyRole("ADMIN"), courseController.createCourse);
courseRouter.patch("/course/:id",TokenVerifier.verifyRole("ADMIN"), courseController.updateCourse);
courseRouter.delete("/course/:id",TokenVerifier.verifyRole("ADMIN"), courseController.deleteCourse);

export default courseRouter;
