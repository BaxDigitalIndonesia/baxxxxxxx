import { Router } from "express";
import resultController from "../controllers/result.controller";

const resultRouter = Router();

// Routes
resultRouter.post("/result", resultController.createResult); // Create a new result
resultRouter.put("/result/:id", resultController.updateResult); // Update a result by ID
resultRouter.get("/result/:id", resultController.getResultById); // Get result by ID
resultRouter.get("/result/exam/:examId", resultController.getResultsForExam); // Get all results for an exam
resultRouter.delete("/result/:id", resultController.deleteResult); // Delete a result by ID

export default resultRouter;
