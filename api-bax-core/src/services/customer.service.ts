import { prisma } from "../lib/client";
import { Request, Response } from "express";
import { Customer } from "../types";
import { getOSAndVersion } from "../utils/regexOs";

class CustomerService {
    async getInsertCustomersByReferrer(
        referrerId: string,
        visitorIp: string,
        userAgent: string,
        geoData: Customer,
        res: Response,
    ) {
        try {
            console.log(geoData);

            const findUser = await prisma.user.findUnique({
                where: {
                    referralCode: referrerId,
                },
            });

            if (!findUser) {
                return res.status(400).json("referal code not found");
            }

            const latitude = geoData.latitude;
            const longitude = geoData.longitude;
            const country = geoData.country;
            const region = geoData.region;
            const city = geoData.city;

            const device = userAgent.includes("Mobile") ? "Mobile" : "Desktop";

            const osDetails = getOSAndVersion(userAgent);

            const customer = await prisma.customer.create({
                data: {
                    referrerId: referrerId,
                    visitorIp: visitorIp,
                    latitude: latitude as string,
                    longitude: longitude as string,
                    country: country,
                    region: region,
                    city: city,
                    os: osDetails,
                    device: device,
                } as Customer,
            });
            return res.status(201).json({
                device: customer.device,
                os: customer.os,
                referrerId: customer.referrerId,
                latitude: customer.latitude,
                longitude: customer.longitude,
                country: customer.country,
                region: customer.region,
                city: customer.city,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    
    async getCustomersByReferral(referrerId: string, res: Response) {
        try {
            if (!referrerId) {
                return res
                    .status(400)
                    .json({ error: "Referrer ID is required" });
            }

            const currentDate = new Date();
            const startDate = new Date(currentDate.getFullYear(), 0, 1);
            const endDate = new Date(
                currentDate.getFullYear(),
                11,
                31,
                23,
                59,
                59,
            );

            const reports = await prisma.customer.findMany({
                where: {
                    referrerId,
                    createdAt: {
                        gte: startDate,
                        lt: endDate,
                    },
                },
                select: {
                    country: true,
                    city: true,
                    latitude: true,
                    longitude: true,
                    visitorIp: true,
                    createdAt: true,
                    os: true,
                    device: true,
                },
            });

            const desktopCount = reports.filter(
                (customer) => customer.device === "Desktop",
            ).length;
            const mobileCount = reports.filter(
                (customer) => customer.device === "Mobile",
            ).length;

            const totalCustomers = reports.length;


        // Calculate this month's total customers
        const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const nextMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

        const currentMonthCount = await prisma.customer.count({
            where: {
                createdAt: {
                    gte: currentMonthStart,
                    lt: nextMonthStart,
                },
            },
        });

        // Calculate the total customers of the previous month
        const previousMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
        const previousMonthEnd = currentMonthStart;

        const previousMonthCount = await prisma.customer.count({
            where: {
                createdAt: {
                    gte: previousMonthStart,
                    lt: previousMonthEnd,
                },
            },
        });

        // Calculate the percentage change
        const percentageChange =
            previousMonthCount === 0
                ? 100 // if before month 0
                : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;


            return res.status(200).json({
                referrerId,
                totalCustomers,
                desktopCount,
                mobileCount,
                customers: reports,
                percentageChange: percentageChange.toFixed(2) + "%", 
            });
        } catch (error) {
            console.error(
                "Error fetching customers by referral and year:",
                error,
            );
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new CustomerService();
