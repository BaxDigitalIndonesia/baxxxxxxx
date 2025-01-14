import { Request, Response } from 'express';
import transactionService from '../services/transaction.service';


class TransactionController {
  
  async createTransaction(req: Request, res: Response) {
    try {
      const  userId  = res.locals.user.id;
       await transactionService.createTransaction(userId,req.body,res);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
       await transactionService.updatedTransaction(req.body,res);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getTransactionStatus(req: Request, res: Response) {
    try {
      const{orderId} =req.params;
      const userId = (req as any).user.id; //id from token
       await transactionService.getTransactionStatus(orderId,userId,res);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }


}

export default new TransactionController();