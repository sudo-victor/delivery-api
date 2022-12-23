import { prisma } from "../../../../infra/database/prisma/prismaClient";

interface IUpdateDeliverymanUseCase {
  id_deliveryman: string;
  id_delivery: string;
}

export class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliverymanUseCase) {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman
      }
    })

    return result
  }
}