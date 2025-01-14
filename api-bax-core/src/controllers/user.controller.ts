import { Request, Response } from "express";
import userService from "../services/user.service";
import errorHandling from "../utils/errorHandling";

class UserService {
    async get(req: Request, res: Response) {
        try {
           // const loginSession = res.locals.user;
         //   console.log("loginSession",loginSession);
            
            userService.getUser(req, res);
        } catch (error) {
            errorHandling.handle(res, error, "Internal Server Error");
        }
    }

    async patch(req: Request, res: Response) {
        userService.updateUser(req, res);
    }
    async delete(req: Request, res: Response) {
        userService.deleteUser(req, res);
    }
}
export default new UserService();
