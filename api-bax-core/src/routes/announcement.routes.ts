import { Router } from "express";
import announcementController from "../controllers/announcement.controller";

const announcementRouter = Router();

// Routes
announcementRouter.post("/announcement", announcementController.createAnnouncement); // Create a new announcement
announcementRouter.put("/announcement/:id", announcementController.updateAnnouncement); // Update an announcement by ID
announcementRouter.get("/announcement/:id", announcementController.getAnnouncementById); // Get an announcement by ID
announcementRouter.get("/announcement/course/:courseId", announcementController.getAnnouncementsForCourse); // Get all announcements for a course
announcementRouter.delete("/announcement/:id", announcementController.deleteAnnouncement); // Delete an announcement by ID

export default announcementRouter;
