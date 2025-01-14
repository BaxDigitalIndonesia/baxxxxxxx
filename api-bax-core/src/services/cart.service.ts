import { Response } from "express";
import { prisma } from "../lib/client";
import errorHandling from "../utils/errorHandling";
import { Cart } from "../types";

class CartService {
    // Get service by ID
    async getCartByUserId(userId: string, res: Response) {
        try {
            if (!userId) {
                return res.status(401).json("Unauthorize");
            }
            const cartItems = await prisma.cart.findMany({
                where: { userId },
                include: {
                    service: {
                        include: {
                            Category: true,
                        },
                    },
                },
            });
            if (!cartItems) {
                return res.status(404).json("Service not found");
            }
            return res.status(200).json(cartItems);
        } catch (error) {
            errorHandling.handle(res, error);
        }
    }
    //cart add
    async addCartByUserId(userId: string, dataCart: Cart, res: Response) {
        try {
            if (!userId) {
                return res.status(401).json("Unauthorize");
            }
            const service = await prisma.service.findUnique({
                where: { id: dataCart.serviceId },
            });
            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }
            //check cart by user
            const checkCart = await prisma.cart.findFirst({
                where: { serviceId: dataCart.serviceId },
            });
            if (checkCart) {
                return res
                    .status(400)
                    .json({ message: "Service already exist" });
            }
            // add cart
            const cart = await prisma.cart.create({
                data: {
                    userId,
                    serviceId: service.id,
                    quantity: 1,
                    totalPrice: service.price,
                },
            });

            return res.status(200).json("Add Service To Cart Successfuly");
        } catch (error) {
            errorHandling.handle(res, error);
        }
    }

    // Delete service by ID
    async deleteCart(cartId: string, userId: string, res: Response) {
        try {
            if (!userId) {
                return res.status(401).json("Unatuhorize");
            }

            if (!cartId) {
                return res.status(400).json("Empty not allowed");
            }
            const response = await prisma.cart.delete({
                where: { id: cartId, userId },
            });
            if (!response) {
                return res.status(403).json("Forbidden");
            }
            return res.status(200).json("Deleted Successfuly");
        } catch (error) {
            errorHandling.handle(res, error);
        }
    }
}

export default new CartService();
