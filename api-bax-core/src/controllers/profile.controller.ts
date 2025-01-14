import { Request, Response } from "express";
import profileService from "../services/profile.service";

class ProfileController {
    // Get profile by user ID
    async getProfile(req: Request, res: Response) {
        try {
            const id = res.locals.user.id;
            await profileService.getProfileByUserId(id, res);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // Create or update profile
    async upsertProfile(req: Request, res: Response) {
        try {
            const id = res.locals.user.id;
           // console.log(id);
            
            await profileService.upsertProfile(id, req.body, res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

}

export default new ProfileController();
