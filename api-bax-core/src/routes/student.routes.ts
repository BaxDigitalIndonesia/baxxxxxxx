import { Router } from "express";
import studentController from "../controllers/student.controller";
import TokenVerifier from "../utils/auth";

const studentRouter = Router();

// Student routes
studentRouter.post("/student",TokenVerifier.verifyRole("MENTOR"), studentController.createStudent);
studentRouter.get("/mentor/:mentorId/students",TokenVerifier.verifyRole("MENTOR"), studentController.getStudentsByMentorId);
studentRouter.get("/student", studentController.getAllStudents);
studentRouter.get("/student/:id", studentController.getStudentById);
studentRouter.patch("/student/:mentorId",TokenVerifier.verifyRole("MENTOR"), studentController.updateStudent);
studentRouter.delete("/student/:id",TokenVerifier.verifyRole("MENTOR"), studentController.deleteStudent);


export default studentRouter;
