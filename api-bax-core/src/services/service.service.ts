import { Response } from "express";
import { prisma } from "../lib/client";
import { Service } from "../types";

export class ServiceService {
    // Get all services
    async getAllServices() {
        return await prisma.service.findMany({
            include: { Category: true },
        });
    }

    // Get service by ID
    async getServiceById(serviceId: string) {
        return await prisma.service.findUnique({
            where: { id: serviceId },
            include: { Category: true },
        });
    }

    // Create a new service
    async createService(userId:string,data: Service, res: Response) {
        // Check if the user is admin
        if(!userId){
            return res.status(400).json("User not found");
        }
        const user = await prisma.user.findUnique({
            where: { id:userId },
        });
        if (!user || user.role !== "ADMIN") {
           return res.status(400).json("Only admin can create a service.");
          }
          
        const response = await prisma.service.create({
            data:{
                name:data.name,
                price:data.price,
                categoryId:data.categoryId,
                qty:data.qty,
                userId,
            }
         });

        return res.status(201).json(response);
    }

    // Update service by ID
    async updateService(serviceId: string, data: any) {
        return await prisma.service.update({
            where: { id: serviceId },
            data,
        });
    }

    // Delete service by ID
    async deleteService(serviceId: string) {
        return await prisma.service.delete({ where: { id: serviceId } });
    }
}
