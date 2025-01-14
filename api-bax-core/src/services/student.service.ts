import { prisma } from "../lib/client";
import { Request, Response } from "express";
import { Student } from "../types";
class StudentService {
    // Create Student
    async createStudent(data: Student, res: Response) {
        try {
            const student = await prisma.student.create({ data });
            return res
                .status(201)
                .json({ message: "Student created successfully", student });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to create student", error });
        }
    }

    async getAllStudents(res: Response) {
        try {
            const students = await prisma.student.findMany({
                include: {
                    courses: true,
                    mentor: true,
                    user: true,
                },
            });
            return res.status(200).json({ students });
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving students",
                error,
            });
        }
    }
    //get student by id
    async getStudentById(id: string, res: Response) {
        try {
            if (!id) {
                return res.status(400).json(`id must not be empty`)
            };
            const student = await prisma.student.findUnique({
                where: { id },
                include: {
                    courses: true,
                    mentor: true,
                    user: true,
                },
            });
            if (!student){
              return res.status(400).json(`Student with ID ${id} not found`);
            }
            return res.status(200).json({
                message:"successfully retrieved data",
                student
            });
        } catch (error) {
            return res.status(500).json(`Error retrieving student: ${error}`);
        }
    }

    // updated student
    async updateStudent(id: string, data: Student, res: Response) {
        try {
            if (!id) {
                return res.status(400).json(`id must not be empty`)
            };
            const updatedStudent = await prisma.student.update({
                where: { id },
                data,
            });
            if (!updatedStudent){
                return res.status(400).json(`failed to retrieve the student data`);
              }
            return res.status(200).json(updatedStudent);
        } catch (error) {
            return res.status(500).json(`Error updating student: ${error}`);
        }
    }

    // deleted student by mentor
    async deleteStudent(id: string, mentorId: string, res: Response) {
        try {
            if (!id && !mentorId) {
                return res.status(400).json(`request must not be empty`);
            }
            await prisma.student.delete({
                where: { id, mentorId },
            });
            return res.status(200).json("Delete student successfully");
        } catch (error) {
            return res.status(500).json(`Error deleting student: ${error}`);
        }
    }

    // Get Students by Mentor ID
    async getStudentsByMentorId(mentorId: string, res: Response) {
        try {
            if (!mentorId) {
                return res.status(400).json({
                    message: "Failed to fetch students",
                });
            }
            const students = await prisma.student.findMany({
                where: { mentorId },
                include: {
                    user: true,
                    mentor: true,
                    courses: true,
                },
            });
            return res.status(200).json({ students });
        } catch (error) {
            return res.status(500).json({
                message: "Failed to fetch students",
                error,
            });
        }
    }
}

export default new StudentService();
