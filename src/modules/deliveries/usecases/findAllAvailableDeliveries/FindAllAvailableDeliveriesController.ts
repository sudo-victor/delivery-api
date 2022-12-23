import { Request, Response } from "express";
import { FindAllAvailableDeliveriesUseCase } from "./FindAllAvailableDeliveriesUseCase";

export class FindAllAvailableDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAllWithoutEndDateUseCase = new FindAllAvailableDeliveriesUseCase();
    const deliveries = await findAllWithoutEndDateUseCase.execute();
    return response.json(deliveries)
  }
}
