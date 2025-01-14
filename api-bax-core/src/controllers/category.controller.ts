import { Request, Response } from "express";
import categoryService from "../services/category.service";

class CategoryController {
    // Create Category
    async createCategory(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id; // ID user from token/authentication
            const {name} = req.body
            
            await categoryService.createCategory(userId, name, res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    // Get All Categories
    async getAllCategories(req: Request, res: Response) {
        try {
            await categoryService.getAllCategories(req.body, res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    // Get Category By ID
    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = (req as any).user.id;
            await categoryService.getCategoryById(parseInt(id), userId, res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    // Update Category
    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = (req as any).user.id; // ID user from token/authentication
            await categoryService.updateCategory(
                parseInt(id),
                userId,
                req,
                res,
            );
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    // Delete Category
    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = (req as any).user.id; // ID user from token/authentication
            await categoryService.deleteCategory(parseInt(id), userId, res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

export default new CategoryController();
