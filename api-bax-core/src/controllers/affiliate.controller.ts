import { Request, Response } from "express";
import AffiliateService from "../services/Affiliate.service";

class AffiliateController {
    // Get affiliate
    async getAffiliatesByMitra(req: Request, res: Response) {
        try {
            const  userId  = res.locals.user.id; // ID user dari token/authentication
            //console.log(userId, res.locals.user);
            
            AffiliateService.getAffiliatesByMitra(userId, res);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async getAffiliatesByUser(req: Request, res: Response) {
        try {
            const  userId  = res.locals.user.id; // ID user dari token/authentication
            //console.log(userId, res.locals.user);
            
            AffiliateService.getAffiliatesByUser(userId, res);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // Add affiliate
    async createAffiliate(req: Request, res: Response) {
        try {
            const mitraId = (req as any).user.id; // ID user from token/authentication
            const requsest = req.body; // ID affiliate by user
            await AffiliateService.createAffiliate(mitraId, requsest, res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    // Delete affiliate
    async deleteAffiliate(req: Request, res: Response) {
        try {
            const mitraId = (req as any).user.id; // ID user from token/authentication
            const { id } = req.params; // ID affiliate 
            await AffiliateService.deleteAffiliate(mitraId, id, res);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new AffiliateController();
