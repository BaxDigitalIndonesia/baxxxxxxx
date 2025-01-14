import addressService from "../services/address.service";
import { Request, Response } from "express";

class AddressController {
    // Get addresses by profile ID
    async getAddresses(req: Request, res: Response) {
        try {
            const { profileId } = req.params;
            await addressService.getAddressesByProfileId(
                parseInt(profileId),res
            );
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    async upsertAddress(req: Request, res: Response) {
        try {
            const { profileId } = req.params;
            await addressService.upsertAddress(parseInt(profileId), req.body, res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

}

export default new AddressController();
