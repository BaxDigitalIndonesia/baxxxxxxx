import { prisma } from "../lib/client";
import { Response } from "express";
import { RegisterAffiliate } from "../types";
import { sendEmail } from "../utils/mailer";
import generateOtp from "../utils/otp";
import { generateReferralCode } from "../utils/referralCode";
import { encrypt } from "../utils/bcrypt";
import { GenerateRandomPassword } from "../utils/generatePassword";

class AffiliateService {
    async createAffiliate(
        mitraId: string,
        request: RegisterAffiliate,
        res: Response,
    ) {
        try {
            // Validasi ID Mitra
            if (!mitraId) {
                return res
                    .status(403)
                    .json({ message: "Option cannot be empty" });
            }

            // Periksa apakah pengguna adalah MITRA
            const mitra = await prisma.user.findUnique({
                where: { id: mitraId },
            });

            if (!mitra || mitra.role !== "MITRA") {
                return res.status(403).json({
                    message: "Only partners can add affiliates",
                });
            }

            const { name, email, phone, referrerId } = request;

            // Check if the email is registered
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Email sudah terdaftar" });
            }

            const password = GenerateRandomPassword();

            const hashPassword = encrypt(password);
            const referralCode = generateReferralCode("AFFILIATE", name);
            const newAffiliate = await prisma.user.create({
                data: {
                    name,
                    email,
                    phone,
                    password: hashPassword,
                    role: "AFFILIATE",
                    referralCode,
                    referrerId,
                    verified: false,
                },
            });

            // Buat entri afiliasi
            await prisma.affiliate.create({
                data: {
                    affiliateId: newAffiliate.id,
                    mitraId: mitra.id,
                },
            });

            const otp = await generateOtp(newAffiliate.id);
            //console.log("otp",otp);
            const verificationLink = `${process.env.VERIFY_LINK_FE}/auth/verify?user=${newAffiliate.id}`;
            const resetLink = `${process.env.VERIFY_LINK_FE}/auth/forgot`;

            await sendEmail(
                newAffiliate.email,
                "Verify Your Affiliate Account",
                `<p>Hi ${newAffiliate.name},</p>
                         <p>You have been added as an affiliate by our partner. Please verify your account by clicking the following link: ${verificationLink} \n\n.After verification, you can reset your password : ${resetLink} \n\nThank you.</p>
                         <p>Your OTP code is <b>${otp}</b>.</p>
                         <p>This code <b>expires in 15 minutes</b>.</p>`,
            );

            return res.status(201).json({
                message:
                    "Afiliasi berhasil ditambahkan. Email verifikasi telah dikirim.",
                data: newAffiliate,
            });
        } catch (error) {
            console.error("Error creating affiliate:", error);
            return res
                .status(500)
                .json({ message: "Gagal menambahkan afiliasi", error });
        }
    }
    async getAffiliatesByUser(userId: string, res: Response) {
        try {
            if (!userId) {
                return res
                    .status(400)
                    .json({ message: "Empty option details are not allowed" });
            }

            const checkUser = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!checkUser) {
                return res.status(401).json({ message: "Unathorize account" });
            }

            // if (checkUser.role === "AFFILIATE") {
            //     return res.status(403).json({ message: "Access denied" });
            // }

            // Fetch mitra data
            const dataMitra = await prisma.affiliate.findMany({
                where: {
                    affiliateId: userId,
                    mitra: {
                        verified: true,
                        referralCode: checkUser.referrerId,
                    },
                },
                include: {
                    mitra: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            createdAt: true,
                        },
                    },
                },
            });
            const data = await prisma.user.findMany({
                where: {
                    referrerId: checkUser.referralCode,
                    verified: true,
                },
                include: {
                    service: true,
                },
            });

            // Calculate total revenue and total sales
            const transactions = await prisma.transaction.findMany({
                where: {
                    status: "SUCCESS",
                    user: {
                        verified: true,
                        referrerId: checkUser.referralCode,
                    },
                },
                select: {
                    userId: true,
                    qty: true,
                    totalPrice: true,
                    createdAt: true,
                },
            });

            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            // Filter transactions for the current month
            const monthlyTransactions = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.createdAt);
                return (
                    transactionDate.getMonth() === currentMonth &&
                    transactionDate.getFullYear() === currentYear
                );
            });

            const totalRevenue = transactions.reduce(
                (sum, transaction) => sum + parseFloat(transaction.totalPrice),
                0,
            );
            const totalSales = transactions.reduce(
                (count, transaction) => count + transaction.qty,
                0,
            );
            const monthlyRevenue = monthlyTransactions.reduce(
                (sum, transaction) => sum + parseFloat(transaction.totalPrice),
                0,
            );
            const monthlySales = monthlyTransactions.reduce(
                (count, transaction) => count + transaction.qty,
                0,
            );

            // Calculate total subscriptions
            const totalSubscriptions = data.length;
            const monthlySubscriptions = data.filter((affiliate) => {
                const affiliateDate = new Date(affiliate.createdAt);
                return (
                    affiliateDate.getMonth() === currentMonth &&
                    affiliateDate.getFullYear() === currentYear
                );
            }).length;

            // Calculate percentages
            const revenuePercentage =
                totalRevenue > 0 ? (monthlyRevenue / totalRevenue) * 100 : 0;
            const salesPercentage =
                totalSales > 0 ? (monthlySales / totalSales) * 100 : 0;
            const subscriptionsPercentage =
                totalSubscriptions > 0
                    ? (monthlySubscriptions / totalSubscriptions) * 100
                    : 0;

            return res.status(200).json({
                data,
                dataMitra: dataMitra,
                totalRevenue,
                totalSales,
                totalSubscriptions,
                monthlyRevenue,
                monthlySales,
                monthlySubscriptions,
                revenuePercentage,
                salesPercentage,
                subscriptionsPercentage,
            });
        } catch (error) {
            console.error("Error retrieving affiliates:", error);
            return res.status(400).json({
                message: "Failed to retrieve affiliates",
                error: error,
            });
        }
    }
    async getAffiliatesByMitra(mitraId: string, res: Response) {
        try {
            if (!mitraId) {
                return res
                    .status(400)
                    .json({ message: "Empty option details are not allowed" });
            }

            const affiliates = await prisma.affiliate.findMany({
                where: { mitraId, affiliate: { verified: true } },
                include: {
                    affiliate: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            createdAt: true,
                            transaction: true,
                        },
                    },
                },
            });

            // Calculate total revenue and total sales
            const transactions = await prisma.transaction.findMany({
                where: {
                    status: "SUCCESS",
                    user: {
                        verified: true,
                        affiliate: { some: { mitraId } },
                    },
                },
                select: {
                    userId: true,
                    qty: true,
                    totalPrice: true,
                    createdAt: true,
                },
            });

            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            // Filter transactions for the current month
            const monthlyTransactions = transactions.filter((transaction) => {
                const transactionDate = new Date(transaction.createdAt);
                return (
                    transactionDate.getMonth() === currentMonth &&
                    transactionDate.getFullYear() === currentYear
                );
            });

            const totalRevenue = transactions.reduce(
                (sum, transaction) => sum + parseFloat(transaction.totalPrice),
                0,
            );
            const totalSales = transactions.reduce(
                (count, transaction) => count + transaction.qty,
                0,
            );
            const monthlyRevenue = monthlyTransactions.reduce(
                (sum, transaction) => sum + parseFloat(transaction.totalPrice),
                0,
            );
            const monthlySales = monthlyTransactions.reduce(
                (count, transaction) => count + transaction.qty,
                0,
            );

            // Calculate total subscriptions
            const totalSubscriptions = affiliates.length;
            const monthlySubscriptions = affiliates.filter((affiliate) => {
                const affiliateDate = new Date(affiliate.createdAt);
                return (
                    affiliateDate.getMonth() === currentMonth &&
                    affiliateDate.getFullYear() === currentYear
                );
            }).length;

            // Calculate percentages
            const revenuePercentage =
                totalRevenue > 0 ? (monthlyRevenue / totalRevenue) * 100 : 0;
            const salesPercentage =
                totalSales > 0 ? (monthlySales / totalSales) * 100 : 0;
            const subscriptionsPercentage =
                totalSubscriptions > 0
                    ? (monthlySubscriptions / totalSubscriptions) * 100
                    : 0;
            // Calculate Top 5 Team Members by Sales
            const teamSales = transactions.reduce(
                (acc: Record<string, number>, transaction) => {
                    const userId = transaction.userId || "unknown";
                    acc[userId] = (acc[userId] || 0) + transaction.qty;
                    return acc;
                },
                {},
            );

            const topTeamMembers = Object.entries(teamSales)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([userId, sales]) => {
                    const affiliate = affiliates.find(
                        (a) => a.affiliate.id === userId,
                    );
                    return {
                        userId,
                        sales,
                        email: affiliate?.affiliate.email || "unknown",
                        name: affiliate?.affiliate.name || "unknown",
                    };
                });

            // Calculate Top 5 Income by User
            const teamIncome = transactions.reduce(
                (acc: Record<string, number>, transaction) => {
                    const userId = transaction.userId || "unknown";
                    acc[userId] =
                        (acc[userId] || 0) + parseFloat(transaction.totalPrice);
                    return acc;
                },
                {},
            );

            const topIncome = Object.entries(teamIncome)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([userId, income]) => {
                    const affiliate = affiliates.find(
                        (a) => a.affiliate.id === userId,
                    );
                    return {
                        userId,
                        income,
                        email: affiliate?.affiliate.email || "unknown",
                        name: affiliate?.affiliate.name || "unknown",
                    };
                });
            return res.status(200).json({
                data: affiliates,
                totalRevenue,
                totalSales,
                totalSubscriptions,
                monthlyRevenue,
                monthlySales,
                monthlySubscriptions,
                revenuePercentage,
                salesPercentage,
                subscriptionsPercentage,
                topTeamMembers,
                topIncome,
            });
        } catch (error) {
            console.error("Error retrieving affiliates:", error);
            return res.status(400).json({
                message: "Failed to retrieve affiliates",
                error: error,
            });
        }
    }

    async deleteAffiliate(mitraId: string, id: string, res: Response) {
        try {
            if (!mitraId || !id) {
                return res
                    .status(400)
                    .json({ message: "Empty option details are not allowed" });
            }
            // Check if the user is a mitra
            const user = await prisma.user.findUnique({
                where: { id: mitraId },
            });

            if (!user || user.role !== "MITRA") {
                return res
                    .status(403)
                    .json({ message: "Only mitra can delete affiliates" });
            }

            // Hapus affiliate
            const affiliate = await prisma.affiliate.delete({
                where: {
                    id,
                },
            });

            if (!affiliate) {
                return res.status(404).json({
                    message: "Affiliate not found or not owned by mitra",
                });
            }

            return res.status(200).json({
                message: "Affiliate deleted successfully",
                data: affiliate,
            });
        } catch (error) {
            console.error("Error deleting affiliate:", error);
            return res
                .status(400)
                .json({ message: "Failed to delete affiliate", error: error });
        }
    }
}

export default new AffiliateService();
