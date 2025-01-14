import { Request, Response } from "express";
import reportService from "../services/report.service";

class ReportController {
    // Create Report
    async createReport(req: Request, res: Response) {
        const reportData = req.body;

        await reportService.createReport(reportData, res);
    }

    // Get All Reports
    async getAllReports(_: Request, res: Response) {
        await reportService.getAllReports(res);
    }

    // Get Report By ID
    async getReportByUserId(req: Request, res: Response) {
        const userId = res.locals.user.id;

        await reportService.getReportByUserId(userId, res);
    }

    // Update Report
    async updateReport(req: Request, res: Response) {
        const { id } = req.params;
        const updatedData = req.body;
        const userId = (req as any).user.id;
        await reportService.updateReport(id, userId, updatedData, res);
    }

    // Delete Report
    async deleteReport(req: Request, res: Response) {
        const { id } = req.params;
        const userId = (req as any).user.id;
        await reportService.deleteReport(id, userId, res);
    }
}

export default new ReportController();
