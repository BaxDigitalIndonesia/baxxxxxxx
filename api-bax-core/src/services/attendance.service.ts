import { prisma } from "../lib/client";
import { Attendance } from "../types";
import { Request, Response } from "express";

class AttendanceService {
    // Create a new attendance record
    async createAttendance(data: Attendance, res: Response) {
        try {
            const attendance = await prisma.attendance.create({
                data: {
                    ...data,
                },
            });

            return res.status(201).json(attendance);
        } catch (error) {
            return res.status(500).json(`Error creating attendance: ${error}`);
        }
    }

    // Update an existing attendance record
    async updateAttendance(id: string, data: Attendance, res: Response) {
        try {
            const updatedAttendance = await prisma.attendance.update({
                where: { id },
                data: {
                    ...data,
                },
            });

            return res.status(200).json(updatedAttendance);
        } catch (error) {
            return res.status(500).json(`Error updating attendance with ID ${id}: ${error}`);
        }
    }

    // Get attendance by ID
    async getAttendanceById(id: string, res: Response) {
        try {
            const attendance = await prisma.attendance.findUnique({
                where: { id },
            });

            if (!attendance) {
                return res.status(404).json({ message: "Attendance not found" });
            }

            return res.status(200).json(attendance);
        } catch (error) {
            return res.status(500).json(`Error fetching attendance: ${error}`);
        }
    }

    // Get all attendances for a lesson
    async getAttendancesForLesson(lessonId: string, res: Response) {
        try {
            const attendances = await prisma.attendance.findMany({
                where: { lessonId },
            });

            if (!attendances || attendances.length === 0) {
                return res.status(404).json({ message: "No attendances found for this lesson" });
            }

            return res.status(200).json(attendances);
        } catch (error) {
            return res.status(400).json(`Error fetching attendances for lesson: ${error}`);
        }
    }

    // Delete an attendance record by ID
    async deleteAttendance(id: string, res: Response) {
        try {
            await prisma.attendance.delete({
                where: { id },
            });

            return res.status(204).json({ message: "Attendance deleted successfully" });
        } catch (error) {
            return res.status(400).json(`Error deleting attendance: ${error}`);
        }
    }
}

export default new AttendanceService();
