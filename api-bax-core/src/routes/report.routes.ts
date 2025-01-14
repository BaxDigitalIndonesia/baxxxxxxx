import { Router } from "express";
import reportController from "../controllers/report.controller";
import TokenVerifier from "../utils/auth";

const reportRouter = Router();

// Endpoints
reportRouter.post("/report",TokenVerifier.verifyRole("ADMIN"), reportController.createReport);
reportRouter.get("/report",TokenVerifier.verifyRole("ADMIN"), reportController.getAllReports);

reportRouter.get(
    "/report-by-user",
    TokenVerifier.verifyRoleToken(),
    reportController.getReportByUserId,
);

reportRouter.patch(
    "/report/:id",
    TokenVerifier.verifyRole("ADMIN"),
    reportController.updateReport,
);
reportRouter.delete(
    "/report/:id",
    TokenVerifier.verifyRole("ADMIN"),
    reportController.deleteReport,
);

export default reportRouter;
