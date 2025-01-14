import { Request, Response } from "express";
import courseService from "../services/course.service";

export class CourseController {
    // Get all courses
    async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await courseService.getAllCourses(res);
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Get a single course
    async getCourseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await courseService.getCourseById(id, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Create a course
    async createCourse(req: Request, res: Response) {
        try {
            const data = req.body;
            await courseService.createCourse(data, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Update a course
    async updateCourse(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedCourse = await courseService.updateCourse(
                id,
                data,
                res,
            );
            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // Delete a course
    async deleteCourse(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = (req as any).user.id
            await courseService.deleteCourse(id,userId, res);
            res.status(200).json({ message: "Course deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new CourseController();
