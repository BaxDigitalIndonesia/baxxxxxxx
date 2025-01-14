import { Request, Response } from "express";
import studentService from "../services/student.service";

class StudentController {
    // Create Student
    async createStudent(req: Request, res: Response) {
        const request = req.body;
        await studentService.createStudent(request,res);
    }

    // Get Students by Mentor ID
    async getStudentsByMentorId(req: Request, res: Response) {
        const { mentorId } = req.params;
        await studentService.getStudentsByMentorId(mentorId, res);
    }
    async getAllStudents(req: Request, res: Response) {
        await studentService.getAllStudents(res);
    }
    async getStudentById(req: Request, res: Response) {
        const { id } = req.params;
        await studentService.getStudentById(id, res);
    }
    async updateStudent(req: Request, res: Response) {
        const { mentorId } = req.params;
        await studentService.updateStudent(mentorId,req.body, res);
    }
    async deleteStudent(req: Request, res: Response) {
        const { id } = req.params;
        const mentorId = (req as any).user.id //mentor id
        await studentService.deleteStudent(id,mentorId, res);
    }
}

export default new StudentController();
