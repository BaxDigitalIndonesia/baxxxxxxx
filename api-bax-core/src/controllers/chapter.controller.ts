import { Request, Response } from "express";
import chapterService from "../services/chapter.service";

class ChapterController {
    // Get all chapters
    async getAllChapters(req: Request, res: Response) {
        try {
            await chapterService.getAllChapters(res);
        } catch (error) {
             res.status(500).json({ message: error });
        }
    }

    // Get a chapter by ID
    async getChapterById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await chapterService.getChapterById(id, res);
        } catch (error) {
             res.status(500).json({ message: error });
        }
    }

    // Create a new chapter
    async createChapter(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id //admin id
            await chapterService.createChapter(req.body,userId, res);
        } catch (error) {
             res.status(500).json({ message: error });
        }
    }

    // Update a chapter
    async updateChapter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            await chapterService.updateChapter(id, data, res);
        } catch (error) {
             res.status(500).json({ message: error });
        }
    }

    // Delete a chapter
    async deleteChapter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await chapterService.deleteChapter(id, res);
        } catch (error) {
             res.status(500).json({ message: error });
        }
    }
}


export default new ChapterController();