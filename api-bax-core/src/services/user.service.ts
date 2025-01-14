import { Request, Response } from "express";
import { prisma } from "../lib/client";

class UserService {
    async getUser(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                include:{
                    affiliate:true,
                    Mentor:true,
                    mitra:true,
                }
            });

            if (users.length === 0) {
                return res.status(404).json({ message: "user not found" });
            }
         
            const data = users.map((e)=>{
                return{
                name:e.name,
                email:e.email,
                referalCode:e.referralCode,
                mitra:e.mitra
                }
            })
             //  console.log(data);
            
            return res.status(200).json({
                message: "retrieve data successfully",
                data:data,
            });
        } catch (error) {
            return res.status(500).json("something wrong error");
        }
    }
    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            if (!name && !email && !password) {
                return res
                    .status(400)
                    .json({ message: "update data must be complete" });
            }
            // find user by ID
            const user = await prisma.user.findUnique({
                where: { id },
            });

            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }

            const updatedData: any = {};
            if (name) updatedData.name = name;
            if (email) updatedData.email = email;
            if (password) {
                //implement bycrpt
                updatedData.password = password;
            }

            // updated data
            const updatedUser = await prisma.user.update({
                where: { id },
                data: updatedData,
            });

            return res.status(200).json({
                message: `user by ID ${id} sucess updated`,
                user: updatedUser,
            });
        } catch (error) {
            return res.status(500).json("something wrong error");
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                return res.status(404).json({ message: "user not found!" });
            }
            //deleted user by id
            await prisma.user.delete({
                where: { id },
            });
            return res.status(200).json({
                message: `user by ID ${id} success deleted`,
            });
        } catch (error) {
            return res.status(500).json("something wrong error!");
        }
    }
}

export default new UserService();
