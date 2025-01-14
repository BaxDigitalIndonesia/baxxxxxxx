import { prisma } from "../lib/client";
import { Review } from "../types";

import { Request, Response } from "express";

class ReviewService {
    // Create a new review
    async createReview(data: Review, res: Response) {
        try {
            const review = await prisma.reviews.create({
                data: {
                    ...data,
                    rating: data.rating ?? 5, // Default to 5 if not provided
                },
            });

            return res.status(201).json(review);
        } catch (error) {
            return res.status(500).json(`Error creating review: ${error}`);
        }
    }

    // Update an existing review
    async updateReview(id: string, data: Review, res: Response) {
        try {
            const updatedReview = await prisma.reviews.update({
                where: { id },
                data: {
                    ...data,
                },
            });

            return res.status(200).json(updatedReview);
        } catch (error) {
            return res
                .status(500)
                .json(`Error updating review with ID ${id}: ${error}`);
        }
    }

    // Get review by ID
    async getReviewById(id: string, res: Response) {
        try {
            const review = await prisma.reviews.findUnique({
                where: { id },
            });

            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            return res.status(200).json(review);
        } catch (error) {
            return res.status(500).json(`Error fetching review: ${error}`);
        }
    }

    // Get all reviews for a course
    async getReviewsForCourse(courserId: string, res: Response) {
        try {
            const reviews = await prisma.reviews.findMany({
                where: { courserId },
            });

            if (!reviews || reviews.length === 0) {
                return res
                    .status(404)
                    .json({ message: "No reviews found for this course" });
            }

            return res.status(200).json(reviews);
        } catch (error) {
            return res.status(400).json(`Error fetching reviews for course: ${error}`);
        }
    }

    // Delete a review by ID
    async deleteReview(id: string,res:Response) {
        try {
             await prisma.reviews.delete({
                where: { id },
            });
            return res
            .status(204)
            .json({ message: "Review deleted successfully" });
        } catch (error) {
            return res.status(400).json(`Error deleting review: ${error}`);
        }
    }
}

export default new ReviewService();
