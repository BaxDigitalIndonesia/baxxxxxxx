import { Response } from "express";
import { prisma } from "../lib/client";
import { Report } from "../types";

class ReportService {
    // Create Report
    async createReport(reportData: Report, res: Response) {
    try {
        // Validasi input
        if (!reportData || !reportData.userId) {
            return res.status(400).json({ message: "Invalid input: userId is required" });
        }

        // Cek user ID
        const user = await prisma.user.findUnique({ where: { id: reportData.userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // validation affiliatePerformance
        if (!Array.isArray(reportData.affiliatePerformance)) {
            return res.status(400).json({ message: "affiliatePerformance must be an array" });
        }

        const affiliateIds = reportData.affiliatePerformance.map((item: any) => item.affiliateId);

        // get affiliate by mitra
        const validAffiliates = await prisma.affiliate.findMany({
            where: {
                mitraId: reportData.userId,
                affiliateId: { in: affiliateIds },
            },
            select: { affiliateId: true }, 
        });

        const validAffiliateIds = validAffiliates.map((item: any) => item.affiliateId);

        // check affilite not valid
        const invalidAffiliateIds = affiliateIds.filter((id: string) => !validAffiliateIds.includes(id));

        if (invalidAffiliateIds.length > 0) {
            return res.status(400).json({
                message: "Invalid affiliate IDs found",
                invalidAffiliateIds,
            });
        }

        const newReport = await prisma.report.create({
            data: {
                userId: reportData.userId,
                totalSales: reportData.totalSales,
                commission: reportData.commission,
                topProduct: reportData.topProduct,
                affiliatePerformance: reportData.affiliatePerformance,
            },
        });

        return res.status(201).json({
            message: "Report created successfully",
            data: newReport,
        });
    } catch (error) {
        console.error("Error creating report:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            details: error,
        });
    }
}

    // Get All Reports
    async getAllReports(res: Response) {
        try {
            const reports = await prisma.report.findMany();
            return res.status(200).json({
                message: "Reports retrieved successfully",
                data: reports,
            });
        } catch (error) {
            console.error("Error retrieving reports:", error);
            res.status(500).json({
                message: "Failed to retrieve reports",
                error: error,
            });
        }
    }
    async getReportByUserId(userId: string, res: Response) {
        try {
            if (!userId) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized" });
            }
    
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    report: true,
                    transaction:true
                },
            });
    
            if (!user || !user.report) {
                return res
                    .status(403)
                    .json({ message: "Forbidden" });
            }
    
             // get affiliate from report
        const affiliateIds = user.report.flatMap((report) => {
            
            const performanceArray = report.affiliatePerformance as {
                name: string;
                affiliateId: string;
                performance: {
                    topProduct: string;
                    totalSales: number;
                    totalBalance: number;
                    totalCustomer: number;
                };
            }[];

            return performanceArray.map((affiliate) => affiliate.affiliateId);
        });

    
            // get transaction by affiliate
            const transactions = await prisma.transaction.findMany({
                where: { userId:{
                    in:affiliateIds
                } },
            });
    
         
            const detailedReports = user.report.map((report) => ({
                ...report,
               // commissionPercentage: report.totalSales > 0 ? (report.commission / report.totalSales) * 100 : 0,
            }));
    
            return res.status(200).json({
                message: "Report retrieved successfully",
                report: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    transaction:user?.transaction,
                    data: detailedReports,
                    transactionAffiliate: transactions,
                },
            });
        } catch (error) {
            console.error("Error retrieving report:", error);
            res.status(500).json({
                message: "Failed to retrieve report",
                error: error,
            });
        }
    }
    

    // Update Report
    async updateReport(
        reportId: string,
        userId: string,
        updatedData: Report,
        res: Response,
    ) {
        try {
            const updatedReport = await prisma.report.update({
                where: { id: reportId, userId },
                data: updatedData,
            });
            return res.status(200).json({
                message: "Report updated successfully",
                data: updatedReport,
            });
        } catch (error) {
            console.error("Error updating report:", error);
            return res.status(500).json({
                message: "Failed to update report",
                error: error,
            });
        }
    }

    // Delete Report
    async deleteReport(reportId: string, userId: string, res: Response) {
        try {
            await prisma.report.delete({
                where: { id: reportId, userId },
            });
            return res.status(200).json({
                message: "Report deleted successfully",
            });
        } catch (error) {
            console.error("Error deleting report:", error);
            return res.status(500).json({
                message: "Failed to delete report",
                error: error,
            });
        }
    }
}

export default new ReportService();
