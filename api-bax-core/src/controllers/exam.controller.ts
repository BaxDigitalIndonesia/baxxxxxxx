import { Request, Response } from "express";
import { Exam } from "../types";
import examService from "../services/exam.service";

class ExamController {
    // Create a new exam
    async createExam(req: Request, res: Response) {
        try {
            const { title, desc, type, startTime, endTime, lessonId, mentorId } = req.body;

            const newExam: Exam = {
                title,
                desc,
                type,
                StartTime: new Date(startTime),
                EndTime: new Date(endTime),
                lessonId,
                mentorId,
            };

            await examService.createExam(newExam, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update an existing exam
    async updateExam(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await examService.updateExam(id, req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get exam by ID
    async getExamById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await examService.getExamById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get all exams for a course
    async getExamsForCourse(req: Request, res: Response) {
        try {
            const { lessonId } = req.params;
            await examService.getExamsForCourse(lessonId, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Delete an exam
    async deleteExam(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await examService.deleteExam(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new ExamController();
