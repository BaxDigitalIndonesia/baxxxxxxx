import { Request, Response } from "express";
import mentorService from "../services/mentor.service";

class MentorController {
    // Create Mentor
    async createMentor(req: Request, res: Response) {
        const {userIdMentor } = req.body;
        const adminId = (req as any).user.id
        await mentorService.createMentor(adminId, userIdMentor, res);
    }

    // Get All Mentors
    async getAllMentors(req: Request, res: Response) {
        await mentorService.getAllMentors(res);
    }

    // Get Mentor by ID
    async getMentorById(req: Request, res: Response) {
        const { mentorId } = req.params;
        await mentorService.getMentorById(mentorId, res);
    }

    // Update Mentor
    async updateMentor(req: Request, res: Response) {
        const { mentorId } = req.params;
        const data = req.body;
        await mentorService.updateMentor(mentorId, data, res);
    }

    // Delete Mentor
    async deleteMentor(req: Request, res: Response) {
        const { mentorId } = req.params;
        const userId = (req as any).user.id
        await mentorService.deleteMentor(mentorId,userId, res);
    }
}

export default new MentorController();
