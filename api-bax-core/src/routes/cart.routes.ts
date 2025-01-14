import { Router } from "express";
import TokenVerifier from "../utils/auth";
import cartController from "../controllers/cart.controller";

const cartRouter = Router();

// Define cart routes
 //get data by user
cartRouter.get("/cart",TokenVerifier.verifyRoleToken(), cartController.getServiceByUserId);
//checkout service by user
cartRouter.post("/cart",TokenVerifier.verifyRoleToken(), cartController.createCart); 
//deleted product
cartRouter.delete("/cart/:id", TokenVerifier.verifyRoleToken(),cartController.deleteCart); 

export default cartRouter;
