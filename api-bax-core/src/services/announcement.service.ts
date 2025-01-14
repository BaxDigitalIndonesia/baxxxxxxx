import { prisma } from "../lib/client";
import { Announcement } from "../types";
import { Response } from "express";

class AnnouncementService {
    // Create a new announcement
    async createAnnouncement(data: Announcement, res: Response) {
        try {
            const announcement = await prisma.announcement.create({
                data: {
                    ...data,
                },
            });

            return res.status(201).json(announcement);
        } catch (error) {
            return res.status(500).json(`Error creating announcement: ${error}`);
        }
    }

    // Update an existing announcement
    async updateAnnouncement(id: string, data: Announcement, res: Response) {
        try {
            const updatedAnnouncement = await prisma.announcement.update({
                where: { id },
                data: {
                    ...data,
                },
            });

            return res.status(200).json(updatedAnnouncement);
        } catch (error) {
            return res.status(500).json(`Error updating announcement with ID ${id}: ${error}`);
        }
    }

    // Get announcement by ID
    async getAnnouncementById(id: string, res: Response) {
        try {
            const announcement = await prisma.announcement.findUnique({
                where: { id },
            });

            if (!announcement) {
                return res.status(404).json({ message: "Announcement not found" });
            }

            return res.status(200).json(announcement);
        } catch (error) {
            return res.status(500).json(`Error fetching announcement: ${error}`);
        }
    }

    // Get all announcements for a course
    async getAnnouncementsForCourse(courseId: string, res: Response) {
        try {
            const announcements = await prisma.announcement.findMany({
                where: { courseId },
            });

            if (!announcements || announcements.length === 0) {
                return res.status(404).json({ message: "No announcements found for this course" });
            }

            return res.status(200).json(announcements);
        } catch (error) {
            return res.status(400).json(`Error fetching announcements for course: ${error}`);
        }
    }

    // Delete an announcement by ID
    async deleteAnnouncement(id: string, res: Response) {
        try {
            await prisma.announcement.delete({
                where: { id },
            });

            return res.status(204).json({ message: "Announcement deleted successfully" });
        } catch (error) {
            return res.status(400).json(`Error deleting announcement: ${error}`);
        }
    }
}

export default new AnnouncementService();
