import { Router } from "express";
import customerController from "../controllers/customer.controller";
import TokenVerifier from "../utils/auth";

const customerRouter = Router();

//define customer routes
customerRouter.post(
    "/customer/:refererId",
    customerController.getInsertCustomersByReferrer,
); //insert data

customerRouter.get(
    "/customer/:referrerId",
    TokenVerifier.verifyRoleToken(),
    customerController.getCustomersByReferrer,
);

export default customerRouter;
