import { prisma } from "../lib/client";
import { Exam } from "../types";
import { Request, Response } from "express";

class ExamService {
    // Create a new exam
    async createExam(data: Exam, res: Response) {
        try {
            const exam = await prisma.exam.create({
                data: {
                    ...data,
                },
            });

            return res.status(201).json(exam);
        } catch (error) {
            return res.status(500).json(`Error creating exam: ${error}`);
        }
    }

    // Update an existing exam
    async updateExam(id: string, data: Exam, res: Response) {
        try {
            const updatedExam = await prisma.exam.update({
                where: { id },
                data: {
                    ...data,
                },
            });

            return res.status(200).json(updatedExam);
        } catch (error) {
            return res.status(500).json(`Error updating exam with ID ${id}: ${error}`);
        }
    }

    // Get exam by ID
    async getExamById(id: string, res: Response) {
        try {
            const exam = await prisma.exam.findUnique({
                where: { id },
            });

            if (!exam) {
                return res.status(404).json({ message: "Exam not found" });
            }

            return res.status(200).json(exam);
        } catch (error) {
            return res.status(500).json(`Error fetching exam: ${error}`);
        }
    }

    // Get all exams for a course
    async getExamsForCourse(lessonId: string, res: Response) {
        try {
            const exams = await prisma.exam.findMany({
                where: { lessonId },
            });

            if (!exams || exams.length === 0) {
                return res.status(404).json({ message: "No exams found for this course" });
            }

            return res.status(200).json(exams);
        } catch (error) {
            return res.status(400).json(`Error fetching exams for course: ${error}`);
        }
    }

    // Delete an exam by ID
    async deleteExam(id: string, res: Response) {
        try {
            await prisma.exam.delete({
                where: { id },
            });

            return res.status(204).json({ message: "Exam deleted successfully" });
        } catch (error) {
            return res.status(400).json(`Error deleting exam: ${error}`);
        }
    }
}

export default new ExamService();
