import { Request, Response } from "express";
import cartService from "../services/cart.service";

class CartController {
    // Get service by ID
    async getServiceByUserId(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;
 await cartService.getCartByUserId(userId, res);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async createCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;

            await cartService.addCartByUserId(userId, req.body, res);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // Delete service
    async deleteCart(req: Request, res: Response) {
        try {
            const { id } = req.params; //cart id
            const userId = res.locals.user.id;
            await cartService.deleteCart(id,userId,res);
     
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new CartController();
