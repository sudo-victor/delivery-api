import { prisma } from "../../../../infra/database/prisma/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id_deliveryman: string) {
    const deliveries = await prisma.deliveryman.findFirst({
      where: { id: id_deliveryman },
      select: {
        Deliveries: true,
        username: true,
        id: true
      }
    })
    return deliveries
  }
}