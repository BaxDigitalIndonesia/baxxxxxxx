import { Response } from "express";
import { prisma } from "../lib/client";
import { Transaction, TransactionNotif } from "../types";
import { createMidtransTransaction } from "../utils/payment";

class TransactionService {
    async createTransaction(userId: string, req: Transaction, res: Response) {
        try {
            if (!userId) {
                return res
                    .status(400)
                    .json({ message: "Empty option details are not allowed" });
            }
            const checkUser= await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!req.serviceId && !checkUser) {
                return res
                    .status(404)
                    .json({ message: "Service or user not found" });
            }

            const checkService = await prisma.service.findUnique({
                where: { id: req.serviceId },
            });
            if (!checkService) {
                return res.status(404).json({ message: "Service not found" });
            }
            const transaction_payment = await prisma.transaction.create({
                data: {
                    userId,
                    serviceId: req.serviceId,
                    qty: req.qty,
                    paymentMethod: req.paymentMethod,
                    totalPrice: req.totalPrice,
                    status: "PENDING",
                },
            });

            const user = await prisma.user.findFirst({
                where: {
                    id: transaction_payment.userId,
                },
            });

            const user_name = user ? user.name : "";
            const user_email = user ? user.email : "";
            // const user_phone = user ? user.phone : "";

            // change payment by Midtrans
            const midtransResponse = await createMidtransTransaction({
                orderId: transaction_payment.id,
                grossAmount: parseInt(transaction_payment.totalPrice),
                name: user_name,
                email: user_email,
                phone: user?.phone as string,
            });

            return res.status(201).json({
                message: "Transaction created successfully",
                transaction_payment,
                paymentUrl: midtransResponse.redirect_url,
                token: midtransResponse.token,
            });
        } catch (error) {
            return res.status(500).json("Something wrong error");
        }
    }

    async updatedTransaction(req: TransactionNotif, res: Response) {
        try {
            // check status payment from Midtrans
            if (
                req.transaction_status === "capture" ||
                req.transaction_status === "settlement"
            ) {
                await prisma.transaction.update({
                    where: { id: req.order_id, userId: req.user_id },
                    data: {
                        status: "SUCCESS",
                    },
                });
            } else if (
                req.transaction_status === "cancel" ||
                req.transaction_status === "deny"
            ) {
                await prisma.transaction.update({
                    where: { id: req.order_id, userId: req.user_id },
                    data: {
                        status: "FAILED",
                    },
                });
            } else if (req.transaction_status === "pending") {
                await prisma.transaction.update({
                    where: { id: req.order_id, userId: req.user_id },
                    data: {
                        status: "PENDING",
                    },
                });
            }

            return res.status(200).json({
                message: "Notification processed successfully",
            });
        } catch (error) {
            console.error("Error processing Midtrans notification:", error);
            res.status(500).json({ message: "Failed to process notification" });
        }
    }

    async getTransactionStatus(orderId: string, userId: string, res: Response) {
        try {
            if (!userId) {
                return res.status(400).json({ message: "Bad Request" });
            }
            const transaction = await prisma.transaction.findFirst({
                where: { id: orderId, userId: userId },
            });

            if (!transaction) {
                return res
                    .status(404)
                    .json({ message: "Transaction not found" });
            }

            return res.status(200).json({
                message: "Transaction status retrieved successfully",
                status: transaction.status,
                totalPrice: transaction.totalPrice,
            });
        } catch (error) {
            console.error("Error retrieving transaction status:", error);
            res.status(500).json({
                message: "Failed to retrieve transaction status",
            });
        }
    }
}

export default new TransactionService();
