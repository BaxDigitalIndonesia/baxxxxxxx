import { Request, Response } from "express";
import phaseService from "../services/phase.service";


export class PhaseController {
  // Get all phases
  async getAllPhases(req: Request, res: Response) {
    try {
      const phases = await phaseService.getAllPhases();
      res.status(200).json(phases);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // Get phase by ID
  async getPhaseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await phaseService.getPhaseById(id,res);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }

  // Create a new phase
  async createPhase(req: Request, res: Response) {
    try {
      const data = req.body;
      const userId = (req as any).user.id //admin id
      await phaseService.createPhase(data,userId,res);
     
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Update phase
  async updatePhase(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const userId = (req as any).user.id //admin id
    await phaseService.updatePhase(id, data,userId,res);
      
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Delete phase
  async deletePhase(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id //admin id
       await phaseService.deletePhase(id,userId,res);
      
    } catch (error) {
      res.status(404).json({ message: error });
    }
  }
}
export default new PhaseController();
