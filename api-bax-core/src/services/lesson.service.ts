import { prisma } from '../lib/client'
import { Day, Lesson } from '../types'
import { Request, Response } from 'express'
import cloudinary from '../utils/cloudinary'
import sharp from 'sharp/lib'

class LessonService {
  // Get all lessons
  async getAllLessons(res: Response) {
    try {
      const lessons = await prisma.lesson.findMany({
        include: {
          chapter: true, // Relasi ke chapter
          exam: true, // Relasi ke exam
          attendance: true // Relasi ke attendance
        }
      })
      return res.status(200).json(lessons)
    } catch (error) {
      throw new Error(`Error fetching lessons: ${error}`)
    }
  }

  // Get lesson by ID
  async getLessonById(id: string, res: Response) {
    try {
      const lesson = await prisma.lesson.findUnique({
        where: { id },
        include: {
          chapter: true,
          exam: true,
          attendance: true
        }
      })
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' })
      }
      return res.status(200).json(lesson)
    } catch (error) {
      return res.status(500).json(`Error fetching lesson with ID ${id}: ${error}`)
    }
  }

  // Create a new lesson
  async createLesson(data: Lesson, res: Response) {
    try {
      const { image, video } = res.locals.files

      // Fungction upload to  Cloudinary
      const uploadToCloudinary = (file: Buffer, folder: string, resourceType: 'image' | 'video') => {
        return new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType },
            (error, result) => {
              if (error) return reject(error)
              resolve(result?.secure_url ?? '')
            }
          )
          uploadStream.end(file)
        })
      }

      // conpress image
      const compressImage = async (fileBuffer: Buffer): Promise<Buffer> => {
        return await sharp(fileBuffer)
          .resize({ width: 1024 }) // resolusi
          .jpeg({ quality: 80 }) // quality
          .toBuffer()
      }

      // upload and save to database in parallel
      const [imageUrl, videoUrl, lessonCreate] = await Promise.all([
        image ? uploadToCloudinary(await compressImage(image.buffer), 'lesson-img', 'image') : null,
        video ? uploadToCloudinary(video.buffer, 'lesson-video', 'video') : null,
        prisma.lesson.create({
          data: {
            chapterId: data.chapterId,
            name: data.name,
            desc: data.desc,
            image: null,
            video: null,
            day: data.day,
            StartTime: new Date(data.StartTime),
            EndTime: new Date(data.EndTime)
          }
        })
      ])

      // Update lesson record with uploaded URL
      const updatedLesson = await prisma.lesson.update({
        where: { id: lessonCreate.id },
        data: {
          image: imageUrl,
          video: videoUrl
        }
      })

      return res.status(201).json(updatedLesson)
    } catch (error) {
      return res.status(500).json({ error: `Error creating lesson: ${error}` })
    }
  }

  // Update an existing lesson
  async updateLesson(id: string, data: Lesson, res: Response) {
    try {
      if (!id) {
        return res.status(400).json('error on request')
      }

      const existLesson = await prisma.lesson.findUnique({
        where: { id }
      })

      if (!existLesson) {
        return res.status(400).json('no data found')
      }
      const { image, video } = res.locals.files

      const uploadToCloudinary = (file: Buffer, folder: string, resourceType: 'image' | 'video') => {
        return new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType },
            (error, result) => {
              if (error) return reject(error)
              resolve(result?.secure_url ?? '')
            }
          )
          uploadStream.end(file)
        })
      }

      const compressImage = async (fileBuffer: Buffer): Promise<Buffer> => {
        return await sharp(fileBuffer).resize({ width: 1024 }).jpeg({ quality: 80 }).toBuffer()
      }

      const [imageUrl, videoUrl] = await Promise.all([
        image ? uploadToCloudinary(await compressImage(image.buffer), 'lesson-img', 'image') : null,
        video ? uploadToCloudinary(video.buffer, 'lesson-video', 'video') : null
      ])

      // update in db
      const updatedLesson = await prisma.lesson.update({
        where: { id },
        data: {
          ...data,
          day: data.day?.toUpperCase() as Day,
          image: imageUrl || undefined,
          video: videoUrl || undefined
        }
      })

      return res.status(200).json(updatedLesson)
    } catch (error) {
      return res.status(500).json({
        error: `Error updating lesson with ID ${id}: ${error}`
      })
    }
  }

  // Delete lesson by ID
  async deleteLesson(id: string, res: Response) {
    try {
      if (!id) {
        return res.status(400).json('error on request')
      }
      await prisma.lesson.delete({
        where: { id }
      })
      return res.status(200).json('delete successfuly')
    } catch (error) {
      return res.status(500).json(`Error deleting lesson with ID ${id}: ${error}`)
    }
  }
}

export default new LessonService()
