import { prisma } from "../lib/client";
import { Request, Response } from "express";
import { Mentor } from "../types";
class MentorService {
    // Create Mentor
    async createMentor(adminId: string, userIdMentor: string, res: Response) {
        try {
            if(!adminId || !userIdMentor){
                return res
                .status(500)
                .json({ message: "Failed to create mentor : Field not null" });
            }

            const mentor = await prisma.mentor.create({
                data: {
                    adminId,
                    userIdMentor,
                },
            });
            return res
                .status(201)
                .json({ message: "Mentor created successfully", mentor });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to create mentor", error });
        }
    }

    // Get All Mentors
    async getAllMentors(res:Response) {
        try {
         const mentors =  await prisma.mentor.findMany({
            include: {
                admin: true,
                mentorUser: true,
                student: true,
            },
        });  
        return  res.status(200).json({ mentors });
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch mentors", error });
        }
       
    }

    // Get Mentor by ID
    async getMentorById(mentorId: string, res: Response) {
        try {
            const mentor = await prisma.mentor.findUnique({
                where: { id: mentorId },
                include: {
                    admin: true,
                    mentorUser: true,
                    student: true,
                },
            });
            if (!mentor) {
                return res.status(404).json({ message: "Mentor not found" });
            }
            return res.status(200).json({ mentor });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Failed to fetch mentor", error });
        }
    }

    // Update Mentor
    async updateMentor(mentorId: string,data:Mentor ,res:Response) {
        try {
            if(!data.adminId || !data.userIdMentor) {
                return res.status(400).json({ message: "user id not null"});
            }
            const updatedMentor = await prisma.mentor.update({
                where: { id: mentorId },
                data,
            });
           return res.status(200).json({
                message: "Mentor updated successfully",
                updatedMentor,
            });
        } catch (error) {
           return res.status(500).json({ message: "Failed to update mentor", error });
        }
        
    }

    // Delete Mentor
    async deleteMentor(mentorId: string,userId:string,res:Response) {
        try {
            const checkUser = await prisma.user.findUnique({
                where:{
                    id:userId
                }
            });
            if(checkUser?.role !== "ADMIN"){
                return res.status(200).json({ message: "Only admin for deleted" });
            }
             await prisma.mentor.delete({
                where: { id: mentorId,adminId:userId },
            });
            return res.status(200).json({ message: "Mentor deleted successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete mentor", error });
        }
        
    }
}

export default new MentorService();
