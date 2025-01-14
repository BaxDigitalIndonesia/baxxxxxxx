import {
    loginValidation,
    registerValidation,
} from "../validations/auth.validation";
import authService from "../services/auth.service";
import { Request, Response } from "express";
import { Login, RoleName } from "../types/index";

class AuthController {
    // Reusable function for validate user registration base on model
    private async createEntity(req: Request, res: Response, role: RoleName) {
       // console.log("Request Body:", req.body);
        const { error } = registerValidation(req.body);
        if (error) {
            // console.error("Validation Error:", error.details);
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map((detail) => detail.message),
            });
        }

        await authService.createAuthSignUpEntity(res, req.body, role);
    }

    private async updateEntity(req: Request, res: Response, role: RoleName) {
       
        await authService.updateAuthSignUpEntity(res, req.body, role);
    }

    private async signInEntity(req: Request, res: Response) {
        const payload: Login = req.body;
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).json({
                message: "Validation error",
                details: error.details.map((detail) => detail.message),
            });
        }

        await authService.createAuthSignInEntity(res, payload);
    }

    public signInUser = async (req: Request, res: Response) => {
        await this.signInEntity(req, res);
    };

    // Public methods for SignUp
    public createUser = async (req: Request, res: Response) => {
        await this.createEntity(req, res, "ADMIN");
    };

    public createMitra = async (req: Request, res: Response) => {
        await this.createEntity(req, res, "MITRA");
    };

    public createAffiliate = async (req: Request, res: Response) => {
        await this.createEntity(req, res, "AFFILIATE");
    };

    public createLecturer = async (req: Request, res: Response) => {
        await this.createEntity(req, res, "MENTOR");
    };

    public createStudent = async (req: Request, res: Response) => {
     
        await this.createEntity(req, res, "STUDENTS");
    };

    //public method signup updated after sign up with google

    public updateUser = async (req: Request, res: Response) => {
        await this.updateEntity(req, res, "ADMIN");
    };

    public updateMitra = async (req: Request, res: Response) => {
        await this.updateEntity(req, res, "MITRA");
    };

    public updateAffiliate = async (req: Request, res: Response) => {
        await this.updateEntity(req, res, "AFFILIATE");
    };

    public updateLecturer = async (req: Request, res: Response) => {
        await this.updateEntity(req, res, "MENTOR");
    };

    public updateStudent = async (req: Request, res: Response) => {
        await this.updateEntity(req, res, "STUDENTS");
    };
}

export default new AuthController();
