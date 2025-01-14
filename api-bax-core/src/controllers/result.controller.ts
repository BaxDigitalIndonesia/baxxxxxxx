import { Request, Response } from "express";
import { Result } from "../types";
import resultService from "../services/result.service";

class ResultController {
    // Create a new result
    async createResult(req: Request, res: Response) {
        try {
            const { score, examId, studentId, attendeeId } = req.body;

            const newResult: Result = {
                score,
                examId,
                studentId,
                attendeeId,
            };

            await resultService.createResult(newResult, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update an existing result
    async updateResult(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await resultService.updateResult(id, req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get result by ID
    async getResultById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await resultService.getResultById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get all results for an exam
    async getResultsForExam(req: Request, res: Response) {
        try {
            const { examId } = req.params;
            await resultService.getResultsForExam(examId, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Delete a result
    async deleteResult(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await resultService.deleteResult(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new ResultController();
