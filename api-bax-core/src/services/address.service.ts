import { prisma } from "../lib/client";
import { Address } from "../types";
import { Response } from "express";

class AddressService {
    // Get addresses by Profile ID
    async getAddressesByProfileId(profileId: number, res: Response) {
        try {
            if (!profileId) {
                return res.status(400).json({
                    status: "BAD REQUEST",
                    message: "please update your profile data first",
                });
            }
            const responseAddress = await prisma.address.findFirst({
                where: { profileId },
            });
            if (!responseAddress) {
                return res.status(403).json({
                    status: "INVALID",
                    message: "Errors occur when retrieving data",
                });
            }
            return res.status(200).json({ responseAddress });
        } catch (error) {
            return res
                .status(500)
                .json({ status: "FAILURE", message: "Something Wrong Error" });
        }
    }

    // Update insert address
    async upsertAddress(profileId: number, data: Address, res: Response) {
        try {
            // console.log(data);
            
            if (!profileId || !data) {
                return res.status(403).json({
                    status: "FORBIDEN",
                    message:
                        "An error occurred, please complete the profile first",
                });
            }
            const checkProfile = await prisma.profile.findUnique({
                where: { id: profileId },
            });

            if (!checkProfile) {
                return res.status(403).json({
                    status: "FORBIDEN",
                    message: "Please update your profile data first",
                });
            }

            let res_data;
            if (profileId) {
                const checkAddress = await prisma.address.findUnique({
                    where: { profileId },
                });

                if (!checkAddress || checkAddress.profileId !== profileId) {
                    return res.status(404).json({
                        status: "NOT FOUND",
                        message:
                            "Address not found or does not belong to this profile",
                    });
                }
                res_data = await prisma.address.update({
                    where: { profileId},
                    data: {
                        country: data.country,
                        region: data.region,
                        city: data.city,
                        district: data.district,
                        village: data.village,
                        street: data.street,
                        postalcode: data.postalcode,
                    },
                });

                // return res.status(200).json(res_data);
            } else {
                 res_data = await prisma.address.create({
                    data: {
                        profileId,
                        country: data.country,
                        region: data.region,
                        city: data.city,
                        district: data.district,
                        village: data.village,
                        street: data.street,
                        postalcode: data.postalcode,
                    },
                });

                
            }
            return res.status(200).json(res_data);
        } catch (error) {
            console.error("Error occurred:", error); 
            return res
                .status(500)
                .json({
                    status: "FAILURE",
                    message: "Something Wrong Error",
                    error: error,
                });
        }
    }
}

export default new AddressService();
