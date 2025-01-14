import { Request, Response } from "express";
import { Event } from "../types";  // Import interface Event
import eventService from "../services/event.service";

class EventController {
    // Create a new event
    async createEvent(req: Request, res: Response) {
        try {
            const { title, desc, image, startDate, endDate, courseId } = req.body;

            const newEvent: Event = {
                title,
                desc,
                image,
                startDate,
                endDate,
                courseId,
            };

            await eventService.createEvent(newEvent, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update an existing event
    async updateEvent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await eventService.updateEvent(id, req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get event by ID
    async getEventById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await eventService.getEventById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get all events for a course
    async getEventsForCourse(req: Request, res: Response) {
        try {
            const { courseId } = req.params;
            await eventService.getEventsForCourse(courseId, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Delete an event
    async deleteEvent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await eventService.deleteEvent(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new EventController();
