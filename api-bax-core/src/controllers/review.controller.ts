import { Request, Response } from "express";
import { Review } from "../types";
import reviewService from "../services/review.service";

 class ReviewController {
    // Create a new review
    async createReview(req: Request, res: Response) {
        try {
            const { rating, comment, userId, courserId } = req.body;

            const newReview: Review = {
                rating,
                comment,
                userId,
                courserId,
            };

            await reviewService.createReview(newReview, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update an existing review
    async updateReview(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await reviewService.updateReview(id, req.body, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get review by ID
    async getReviewById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await reviewService.getReviewById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get all reviews for a course
    async getReviewsForCourse(req: Request, res: Response) {
        try {
            const { courserId } = req.params;
            await reviewService.getReviewsForCourse(courserId, res);
        } catch (error) {
             res.status(500).json({ message: error });
        }
    }

    // Delete a review
    async deleteReview(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await reviewService.deleteReview(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}


export default new ReviewController();