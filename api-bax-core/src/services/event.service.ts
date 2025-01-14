import { prisma } from "../lib/client";
import { Event } from "../types";  // Import interface Event
import { Request, Response } from "express";

class EventService {
    // Create a new event
    async createEvent(data: Event, res: Response) {
        try {
            const event = await prisma.event.create({
                data: {
                    ...data,
                },
            });
            return res.status(201).json(event);
        } catch (error) {
            return res.status(500).json(`Error creating event: ${error}`);
        }
    }

    // Update an existing event
    async updateEvent(id: string, data: Event, res: Response) {
        try {
            const updatedEvent = await prisma.event.update({
                where: { id },
                data: {
                    ...data,
                },
            });
            return res.status(200).json(updatedEvent);
        } catch (error) {
            return res.status(500).json(`Error updating event with ID ${id}: ${error}`);
        }
    }

    // Get event by ID
    async getEventById(id: string, res: Response) {
        try {
            const event = await prisma.event.findUnique({
                where: { id },
            });

            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            return res.status(200).json(event);
        } catch (error) {
            return res.status(500).json(`Error fetching event: ${error}`);
        }
    }

    // Get all events for a course
    async getEventsForCourse(courseId: string, res: Response) {
        try {
            const events = await prisma.event.findMany({
                where: { courseId },
            });

            if (!events || events.length === 0) {
                return res.status(404).json({ message: "No events found for this course" });
            }

            return res.status(200).json(events);
        } catch (error) {
            return res.status(400).json(`Error fetching events for course: ${error}`);
        }
    }

    // Delete an event by ID
    async deleteEvent(id: string, res: Response) {
        try {
            await prisma.event.delete({
                where: { id },
            });
            return res.status(204).json({ message: "Event deleted successfully" });
        } catch (error) {
            return res.status(400).json(`Error deleting event: ${error}`);
        }
    }
}

export default new EventService();
