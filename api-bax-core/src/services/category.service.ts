import { Request, Response } from "express";
import { prisma } from "../lib/client";


 class CategoryService {
    // Create Category
     async createCategory(userId:string,name: string, res: Response) {
        try {
         
            const newCategory = await prisma.category.create({
                data: {
                    name,
                    userId,
                },
            });

            res.status(201).json({
                message: "Category created successfully",
                data: newCategory,
            });
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({
                message: "Failed to create category",
                error: error,
            });
        }
    }

    // Get All Categories
     async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await prisma.category.findMany({
                include: {
                    services: true, 
                },
            });

            res.status(200).json({
                message: "Categories retrieved successfully",
                data: categories,
            });
        } catch (error) {
            console.error("Error retrieving categories:", error);
            res.status(500).json({
                message: "Failed to retrieve categories",
                error: error,
            });
        }
    }

    // Get Category By ID
     async getCategoryById(id: number,userId:string, res: Response) {
        try {
           
            const category = await prisma.category.findUnique({
                where: { id,userId },
                include: {
                    services: true,
                },
            });

            if (!category) {
                return res.status(404).json({
                    message: "your Category not found",
                });
            }

            res.status(200).json({
                message: "Category retrieved successfully",
                data: category,
            });
        } catch (error) {
            console.error("Error retrieving category:", error);
            res.status(500).json({
                message: "Failed to retrieve category",
                error: error,
            });
        }
    }

    // Update Category
     async updateCategory(id:number,userId:string,req: Request, res: Response) {
        try {
            const { name } = req.body;
            const updatedCategory = await prisma.category.update({
                where: { id },
                data: {
                    name,
                    userId,
                },
            });

            res.status(200).json({
                message: "Category updated successfully",
                data: updatedCategory,
            });
        } catch (error) {
            console.error("Error updating category:", error);
            res.status(500).json({
                message: "Failed to update category",
                error: error,
            });
        }
    }

    // Delete Category
     async deleteCategory(id:number,userId:string,res: Response) {
        try {
        
            await prisma.category.delete({
                where: { id,userId},
            });

            res.status(200).json({
                message: "Category deleted successfully",
            });
        } catch (error) {
            console.error("Error deleting category:", error);
            res.status(500).json({
                message: "Failed to delete category",
                error: error,
            });
        }
    }
}

export default new CategoryService();