import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';

const serviceService = new ServiceService();

class ServiceController {
  // Get all services
  async getAllServices(req: Request, res: Response) {
    try {
      const services = await serviceService.getAllServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }

  // Get service by ID
  async getServiceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await serviceService.getServiceById(id);
      if (!service){
       res.status(404).json({ message: 'Service not found' });
      } 
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  // Create service
  async createService(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id
       await serviceService.createService(userId,req.body,res);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  // Update service
  async updateService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await serviceService.updateService(id, req.body);
      res.status(200).json(service);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  // Delete service
  async deleteService(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await serviceService.deleteService(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new ServiceController();