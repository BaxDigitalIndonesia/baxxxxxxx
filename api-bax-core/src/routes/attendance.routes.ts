import { Router } from "express";
import attendanceController from "../controllers/attendance.controller";

const attendanceRouter = Router();

// Routes
attendanceRouter.post("/attendance", attendanceController.createAttendance); // Create a new attendance record
attendanceRouter.put("/attendance/:id", attendanceController.updateAttendance); // Update an attendance record by ID
attendanceRouter.get("/attendance/:id", attendanceController.getAttendanceById); // Get attendance by ID
attendanceRouter.get("/attendance/lesson/:lessonId", attendanceController.getAttendancesForLesson); // Get all attendances for a lesson
attendanceRouter.delete("/attendance/:id", attendanceController.deleteAttendance); // Delete an attendance record by ID

export default attendanceRouter;
