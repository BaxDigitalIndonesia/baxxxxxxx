import { Request, Response } from "express";
import lessonService from "../services/lesson.service";

class LessonController {
    // Get all lessons
    async getAllLessons(req: Request, res: Response) {
        try {
            await lessonService.getAllLessons(res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get lesson by ID
    async getLessonById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await lessonService.getLessonById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Create a new lesson
    async createLesson(req: Request, res: Response) {
        try {
            await lessonService.createLesson(req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update a lesson
    async updateLesson(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await lessonService.updateLesson(id, req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Delete a lesson
    async deleteLesson(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await lessonService.deleteLesson(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new LessonController();
