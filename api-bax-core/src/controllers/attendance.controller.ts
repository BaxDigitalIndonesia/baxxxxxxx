import { Request, Response } from "express";
import { Attendance } from "../types";
import attendanceService from "../services/attendance.service";

class AttendanceController {
    // Create a new attendance record
    async createAttendance(req: Request, res: Response) {
        try {
            const { checkIn, checkOut, present, studentId, lessonId, resultId } = req.body;

            const newAttendance: Attendance = {
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                present,
                studentId,
                lessonId,
                resultId,
            };

            await attendanceService.createAttendance(newAttendance, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update an existing attendance record
    async updateAttendance(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await attendanceService.updateAttendance(id, req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get attendance by ID
    async getAttendanceById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await attendanceService.getAttendanceById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get all attendances for a lesson
    async getAttendancesForLesson(req: Request, res: Response) {
        try {
            const { lessonId } = req.params;
            await attendanceService.getAttendancesForLesson(lessonId, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Delete an attendance record
    async deleteAttendance(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await attendanceService.deleteAttendance(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new AttendanceController();
