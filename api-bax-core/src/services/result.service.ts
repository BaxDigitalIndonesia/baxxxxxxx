import { prisma } from "../lib/client";
import { Result } from "../types";
import { Request, Response } from "express";

class ResultService {
    // Create a new result
    async createResult(data: Result, res: Response) {
        try {
            const result = await prisma.result.create({
                data: {
                    ...data,
                },
            });

            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json(`Error creating result: ${error}`);
        }
    }

    // Update an existing result
    async updateResult(id: string, data: Result, res: Response) {
        try {
            const updatedResult = await prisma.result.update({
                where: { id },
                data: {
                    ...data,
                },
            });

            return res.status(200).json(updatedResult);
        } catch (error) {
            return res.status(500).json(`Error updating result with ID ${id}: ${error}`);
        }
    }

    // Get result by ID
    async getResultById(id: string, res: Response) {
        try {
            const result = await prisma.result.findUnique({
                where: { id },
            });

            if (!result) {
                return res.status(404).json({ message: "Result not found" });
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(`Error fetching result: ${error}`);
        }
    }

    // Get all results for an exam
    async getResultsForExam(examId: string, res: Response) {
        try {
            const results = await prisma.result.findMany({
                where: { examId },
            });

            if (!results || results.length === 0) {
                return res.status(404).json({ message: "No results found for this exam" });
            }

            return res.status(200).json(results);
        } catch (error) {
            return res.status(400).json(`Error fetching results for exam: ${error}`);
        }
    }

    // Delete a result by ID
    async deleteResult(id: string, res: Response) {
        try {
            await prisma.result.delete({
                where: { id },
            });

            return res.status(204).json({ message: "Result deleted successfully" });
        } catch (error) {
            return res.status(400).json(`Error deleting result: ${error}`);
        }
    }
}

export default new ResultService();
