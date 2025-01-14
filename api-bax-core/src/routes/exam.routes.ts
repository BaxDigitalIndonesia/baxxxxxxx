import { Router } from "express";
import examController from "../controllers/exam.controller";

const examRouter = Router();

// Routes
examRouter.post("/exam", examController.createExam); // Create a new exam
examRouter.put("/exam/:id", examController.updateExam); // Update an exam by ID
examRouter.get("/exam/:id", examController.getExamById); // Get exam by ID
examRouter.get("/exam/course/:lessonId", examController.getExamsForCourse); // Get all exams for a course
examRouter.delete("/exam/:id", examController.deleteExam); // Delete an exam by ID

export default examRouter;
