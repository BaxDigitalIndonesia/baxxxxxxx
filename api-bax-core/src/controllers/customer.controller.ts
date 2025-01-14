import { Request, Response } from "express";
import customerService from "../services/customer.service";
class CustomerController {

    async getInsertCustomersByReferrer(req: Request, res: Response) {
        try {
            const { refererId} = req.params;//referal code affiliate
            const visitorIp = req.headers["x-forwarded-for"];
            const userAgent = req.headers["user-agent"];
            console.log("visitorIp :",visitorIp," userAgent:",userAgent);

           
           await customerService.getInsertCustomersByReferrer(refererId, visitorIp as string,userAgent as string,req.body,res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    async getCustomersByReferrer(req: Request, res: Response) {
        try {
            const { referrerId} = req.params;
           await customerService.getCustomersByReferral(referrerId,res);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
   
}

export default new CustomerController();
