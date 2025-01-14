import { Request, Response } from "express";
import { Announcement } from "../types";
import announcementService from "../services/announcement.service";

class AnnouncementController {
    // Create a new announcement
    async createAnnouncement(req: Request, res: Response) {
        try {
            const { title, desc, date, courseId } = req.body;

            const newAnnouncement: Announcement = {
                title,
                desc,
                date,
                courseId,
            };

            await announcementService.createAnnouncement(newAnnouncement, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update an existing announcement
    async updateAnnouncement(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await announcementService.updateAnnouncement(id, req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get announcement by ID
    async getAnnouncementById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await announcementService.getAnnouncementById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get all announcements for a course
    async getAnnouncementsForCourse(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            await announcementService.getAnnouncementsForCourse(courseId, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Delete an announcement
    async deleteAnnouncement(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await announcementService.deleteAnnouncement(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new AnnouncementController();
