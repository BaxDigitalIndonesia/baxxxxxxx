import { PaymentDetails } from "../types";

const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const createMidtransTransaction = async (req_payment:PaymentDetails) => {
    try {
        const transaction = await snap.createTransaction({
            transaction_details: {
                order_id: req_payment.orderId,
                gross_amount: req_payment.grossAmount,
            },
            customer_details: {
                name: req_payment.name,
                email: req_payment.email,
                phone:req_payment.phone,
            },
        });
        return transaction;
    } catch (error) {
       return (`Failed to create Midtrans transaction: ${error}`);
    }
};
