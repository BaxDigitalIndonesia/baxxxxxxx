import { Router } from "express";
import reviewController from "../controllers/review.controller";


const reviewRouter = Router();

// Routes
reviewRouter.post("/review", reviewController.createReview); // Create a new review
reviewRouter.put("/review/:id", reviewController.updateReview); // Update a review by ID
reviewRouter.get("/review/:id", reviewController.getReviewById); // Get review by ID
reviewRouter.get("/review/course/:courserId", reviewController.getReviewsForCourse); // Get all reviews for a course
reviewRouter.delete("/review/:id", reviewController.deleteReview); // Delete a review by ID

export default reviewRouter;
