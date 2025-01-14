import { Router } from "express";
import affiliateController from "../controllers/affiliate.controller";
import TokenVerifier from "../utils/auth";

const affiliateRouter = Router();

//define affiliate routes
affiliateRouter.post(
    "/affiliate",
    TokenVerifier.verifyRole("MITRA"),
    affiliateController.createAffiliate,
);
affiliateRouter.get("/affiliateByUser",TokenVerifier.verifyRoleToken(), affiliateController.getAffiliatesByUser);
affiliateRouter.get('/affiliate',TokenVerifier.verifyRole("MITRA"), affiliateController.getAffiliatesByMitra);
affiliateRouter.delete(
    "/affiliate/:affiliateId",
    TokenVerifier.verifyRole("MITRA"),
    affiliateController.deleteAffiliate,
);

export default affiliateRouter;
