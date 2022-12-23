import { prisma } from "../../../../infra/database/prisma/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.clients.findFirst({
      where: { id: id_client },
      select: {
        Deliveries: true,
        username: true,
        id: true
      },
    })

    return deliveries
  }
}