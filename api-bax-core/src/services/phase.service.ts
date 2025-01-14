import { prisma } from "../lib/client";
import { Phase } from "../types";
import { Request, Response } from "express";

class PhaseService {
    // Get all phases
    async getAllPhases() {
        try {
            return await prisma.phase.findMany({
                include: {
                    chapter: true,
                    course: true,
                },
            });
        } catch (error) {
            throw new Error(`Error fetching phases: ${error}`);
        }
    }

    // Get a single phase by ID
    async getPhaseById(id: string, res: Response) {
        try {
            const phase = await prisma.phase.findUnique({
                where: { id },
                include: {
                    chapter: true,
                    course: true,
                },
            });

            if (!phase) {
                return res.status(400).json("Phase not found");
            }

            return res.status(200).json(phase);
        } catch (error) {
            return res.status(400).json(`Error fetching phase by ID: ${error}`);
        }
    }

    // Create a new phase
    async createPhase(data: Phase, userId: string, res: Response) {
        try {
            if (!userId) {
                return res.status(400).json("User Not Found");
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user || user.role !== "ADMIN") {
                return res.status(400).json("Only admin can create.");
            }

            const phase = await prisma.phase.create({
                data,
            });

            return res
                .status(201)
                .json({ message: "successfully added aphase", phase });
        } catch (error) {
            return res.status(201).json(`Error creating phase: ${error}`);
        }
    }

    // Update a phase
    async updatePhase(id: string, data: Phase, userId: string, res: Response) {
        try {
            if (!userId) {
                return res.status(400).json("User Not Found");
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user || user.role !== "ADMIN") {
                return res.status(400).json("Only admin can create.");
            }

            const updatedPhase = await prisma.phase.update({
                where: { id },
                data,
            });

            return res.status(200).json(updatedPhase);
        } catch (error) {
            return res.status(200).json(`Error updating phase: ${error}`);
        }
    }

    // Delete a phase
    async deletePhase(id: string, userId: string, res: Response) {
        try {
            if (!userId) {
                return res.status(400).json("User Not Found");
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user || user.role !== "ADMIN") {
                return res.status(400).json("Only admin can create.");
            }

            await prisma.phase.delete({
                where: { id },
            });
            return res
                .status(200)
                .json({ message: "Phase deleted successfully" });
        } catch (error) {
            return res.status(200).json(`Error deleting phase: ${error}`);
        }
    }
}

export default new PhaseService();
