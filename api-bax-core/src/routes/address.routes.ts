import addressController from "../controllers/address.controller";
import { Router } from "express";
import TokenVerifier from "../utils/auth";

const addressRouter = Router();

//address routes
addressRouter.get("/address/:profileId",TokenVerifier.verifyRoleToken(), addressController.getAddresses);
addressRouter.patch("/address/:profileId",TokenVerifier.verifyRoleToken() ,addressController.upsertAddress);

export default addressRouter;
