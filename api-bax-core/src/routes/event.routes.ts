import { Router } from "express";
import eventController from "../controllers/event.controller";

const eventRouter = Router();

// Routes
eventRouter.post("/event", eventController.createEvent); // Create a new event
eventRouter.put("/event/:id", eventController.updateEvent); // Update an event by ID
eventRouter.get("/event/:id", eventController.getEventById); // Get event by ID
eventRouter.get("/event/course/:courseId", eventController.getEventsForCourse); // Get all events for a course
eventRouter.delete("/event/:id", eventController.deleteEvent); // Delete an event by ID

export default eventRouter;
