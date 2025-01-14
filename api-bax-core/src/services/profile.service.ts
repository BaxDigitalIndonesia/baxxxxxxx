import { prisma } from "../lib/client";
import { Profile } from "../types";
import { Response } from "express";
import cloudinary from "../utils/cloudinary";

export class ProfileService {
    // Get profile by User ID
    async getProfileByUserId(userId: string, res: Response) {
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Please login or register first",
            });
        }
        const checkUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!checkUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const getData = await prisma.profile.findUnique({
            where: { userId },
            include: {
                address: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                        referralCode: true,
                    },
                },
            },
        });

        return res.status(200).json({ profile: getData });
    }

    // Insert or Update profile
    // async upsertProfile(userId: string, data: Profile, res: Response) {
    //     try {
    //         if(!userId){
    //             return res.status(401).json({error:"Unauthorized", message: "Please login or register first" });
    //         }
    //         const file = res.locals.file;

    //         if (!file) {
    //             return res.status(400).json({ error: "No file uploaded." });
    //         }

    //         // Uploading buffer files to Cloudinary
    //         const cloudinaryResponse = cloudinary.uploader.upload_stream(
    //             {
    //                 folder: "profile",
    //                 public_id: `profile_${userId}`,
    //                 resource_type: "image",
    //             },
    //             async (error, result) => {
    //                 if (error) {
    //                     return res
    //                         .status(500)
    //                         .json({ error: "Cloudinary upload failed." });
    //                 }

    //                 const photoUrl = result?.secure_url;

    //                 // select user
    //                 const existingUser = await prisma.user.findUnique({
    //                     where: { id: userId },
    //                 });
    //                 if (!existingUser) {
    //                     return res
    //                         .status(400)
    //                         .json({ error: "user not found" });
    //                 }
    //                 const checkProfile = await prisma.profile.findUnique({
    //                     where: { userId },
    //                 });
    //                 if (!checkProfile) {
    //                     // Update profile
    //                     await prisma.profile.create({
    //                         data: {
    //                             userId,
    //                             photo: photoUrl,
    //                             age: data.age,
    //                             birthday: data.birthday,
    //                             gender: data.gender,
    //                             job: data.job,
    //                         },
    //                     });
    //                 } else {
    //                     await prisma.profile.update({
    //                         where: { userId },
    //                         data: {
    //                             photo: photoUrl,
    //                             age: data.age,
    //                             birthday: data.birthday,
    //                             gender: data.gender,
    //                             job: data.job,
    //                         },
    //                     });
    //                 }
    //             },
    //         );
    //         //send buffer to cloud
    //         file.buffer && cloudinaryResponse.end(file.buffer);

    //         return res
    //             .status(200)
    //             .json({ message: "Profile updated successfully" });
    //     } catch (error) {
    //         console.error("Error uploading to Cloudinary:", error);
    //         return res
    //             .status(500)
    //             .json({ error: "Failed to upload file to Cloudinary." });
    //     }
    // }
    async upsertProfile(userId: string, data: Profile, res: Response) {
        try {
            if (!userId) {
                return res.status(401).json({
                    error: "Unauthorized",
                    message: "Please login or register first",
                });
            }

            const file = res.locals.file;
            let photoUrl: string | undefined;

            if (file) {
                // Upload file to Cloudinary
                const cloudinaryResponse = await new Promise(
                    (resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            {
                                folder: "profile",
                                public_id: `profile_${userId}`,
                                resource_type: "image",
                            },
                            (error, result) => {
                                if (error) return reject(error);
                                resolve(result);
                            },
                        );
                        file.buffer && uploadStream.end(file.buffer);
                    },
                );

                if (!cloudinaryResponse) {
                    return res
                        .status(500)
                        .json({ error: "Cloudinary upload failed." });
                }
                photoUrl = (cloudinaryResponse as any).secure_url;
            }

            // Check if user exists
            const existingUser = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!existingUser) {
                return res.status(400).json({ error: "User not found" });
            }

            // Check if profile exists
            const checkProfile = await prisma.profile.findUnique({
                where: { userId },
            });
            let profile_user;
            if (!checkProfile) {
                // Create profile
                profile_user = await prisma.profile.create({
                    data: {
                        userId,
                        photo: photoUrl,
                        age: data.age,
                        birthday: data.birthday,
                        gender: data.gender,
                        job: data.job,
                    },
                });
            } else {
                // Update profile
                profile_user = await prisma.profile.update({
                    where: { userId },
                    data: {
                        ...(photoUrl && { photo: photoUrl }), // Update photo only if file is uploaded
                        age: data.age,
                        birthday: data.birthday,
                        gender: data.gender,
                        job: data.job,
                    },
                });
            }

            return res
                .status(200)
                .json({
                    message: "Profile updated successfully",
                    profile_user,
                });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({
                error: "An error occurred while updating the profile.",
            });
        }
    }
}

export default new ProfileService();
