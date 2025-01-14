import { PrismaClient } from "@prisma/client";
import { Chapter } from "../types";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export class ChapterService {
  // Get all chapters
  async getAllChapters(res:Response) {
    try {
       const chapters = await prisma.chapters.findMany({
        include: {
          phase: true, 
          lesson: true, 
        },
      });
      return res.status(200).json(chapters);
    } catch (error) {
      return res.status(400).json(`Error fetching chapters: ${error}`);
    }
  }

  // Get a single chapter by ID
  async getChapterById(id: string,res:Response) {
    try {
      const chapter =  await prisma.chapters.findUnique({
        where: { id },
        include: {
          phase: true,
          lesson: true,
        },
      });
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      return res.status(200).json(chapter);
    } catch (error) {
      return res.status(500).json(`Error fetching chapter with ID ${id}: ${error}`);
    }
  }

  // Create a new chapter
  async createChapter(data: Chapter,userId:string,res:Response) {
    try {
      if(!userId){
        return res.status(400).json("User Not Found");
      
      }

      const user = await prisma.user.findUnique({
        where:{
          id:userId
        }
      });
      if (!user || user.role !== "ADMIN") {
        return res.status(400).json("Only admin can create.");
       }

      const newChapter =  await prisma.chapters.create({
        data,
      });
      return res.status(201).json(newChapter);
    } catch (error) {
      return res.status(500).json(`Error creating chapter: ${error}`);
    }
  }

  // Update a chapter
  async updateChapter(id: string, data: Chapter,res:Response) {
    try {
      const updatedChapter = await prisma.chapters.update({
        where: { id },
        data,
      });
      return res.status(200).json(updatedChapter);
    } catch (error) {
      return res.status(500).json(`Error updating chapter with ID ${id}: ${error}`);
    }
  }

  // Delete a chapter
  async deleteChapter(id: string,res:Response) {
    try {
      const deletedChapter = await prisma.chapters.delete({
        where: { id },
      });
      return res.status(200).json(deletedChapter);
    } catch (error) {
      return res.status(500).json(`Error deleting chapter with ID ${id}: ${error}`);
    }
  }
}

export default new ChapterService();