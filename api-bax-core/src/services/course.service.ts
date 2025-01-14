import { Request, Response } from "express";
import { prisma } from "../lib/client";
import { Course } from "../types";

class CourseService {
    // Get all courses
    async getAllCourses(res: Response) {
        try {
            return await prisma.courses.findMany({
                include: {
                    phase: true,
                    student: true,
                    user: false,
                    Mentor: true,
                    Reviews: true,
                    Announcement: true,
                    Event: true,
                },
            });
        } catch (error) {
            return res.status(400).json(`Error fetching courses: ${error}`);
        }
    }

    // Get a course by ID
    async getCourseById(id: string, res: Response) {
        try {
            const course = await prisma.courses.findUnique({
                where: { id },
                include: { phase: true },
            });
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            return res.status(200).json(course);
        } catch (error) {
            return res.status(400).json(`Error fetching courses: ${error}`);
        }
    }

    // Create a new course
    async createCourse(courseParams: Course, res: Response) {
        try {
            if (!courseParams.mentorId || !courseParams.userId) {
                return res
                    .status(400)
                    .json(`Error creating courses: user not null `);
            }
            

            const mentor = await prisma.mentor.findUnique({
                where: { id: courseParams.mentorId },
            });

           
            if (courseParams.mentorId !== mentor?.id) {
                return res.status(400).json(`mentor not found `);
            }

            const user = await prisma.user.findUnique({
                where: { id: courseParams.userId },
            });

            if (user?.role !== "ADMIN") {
                return res.status(400).json(`Only User for add course`);
            }

            const course = await prisma.courses.create({
                data: { ...courseParams },
            });

            if (!course) {
                return res.status(400).json(course);
            }
            return res.status(200).json(course);
        } catch (error) {
            return res.status(400).json(`Error creating courses: ${error}`);
        }
    }

    // Update a course
    async updateCourse(id: string, data: Course, res: Response) {
        try {
            return await prisma.courses.update({
                where: { id },
                data,
            });
        } catch (error) {
            return res.status(400).json(`Error updating courses: ${error}`);
        }
    }

    // Delete a course
    async deleteCourse(id: string,userId:string, res: Response) {
        try {

            return await prisma.courses.delete({ where: { id ,userId} });
        } catch (error) {
            return res.status(400).json(`Error deleting courses: ${error}`);
        }
    }
}

export default new CourseService();
