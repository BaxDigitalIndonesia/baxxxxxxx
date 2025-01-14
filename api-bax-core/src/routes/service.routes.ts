import { Router } from "express";
import serviceController from "../controllers/service.controller";
import TokenVerifier from "../utils/auth";

const serviceRouter = Router();

// Define service routes
serviceRouter.get("/service", serviceController.getAllServices);
serviceRouter.post("/service", TokenVerifier.verifyRole("ADMIN"),serviceController.createService); // admin role only
serviceRouter.patch(
    "/service/:id",
    TokenVerifier.verifyRole("ADMIN"),
    serviceController.updateService,
); // admin role only
serviceRouter.delete(
    "/service/:id",
    TokenVerifier.verifyRole("ADMIN"),
    serviceController.deleteService,
); // admin role only

export default serviceRouter;
