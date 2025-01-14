import { Router } from 'express';
import transactionController from '../controllers/transaction.controller';
import TokenVerifier from '../utils/auth';

const transactionRouter = Router();

//define transaction routes

transactionRouter.post(
    "/transaction",
    TokenVerifier.verifyRoleToken(),
    transactionController.createTransaction,
);
transactionRouter.post(
    "/transaction/webhook",
    TokenVerifier.verifyRoleToken(),
    transactionController.updateTransaction,
); //handler notif from midtrans
transactionRouter.get(
    "/transaction/status/:orderId",
    TokenVerifier.verifyRole("ADMIN"),
    transactionController.getTransactionStatus,
);

export default transactionRouter;
