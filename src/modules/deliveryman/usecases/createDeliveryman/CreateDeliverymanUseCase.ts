import { hash } from 'bcrypt'

import { prisma } from "../../../../infra/database/prisma/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ password, username}: ICreateDeliveryman) {
    // Validate if user already exists
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive" 
        }
      }
    });
    if (deliverymanExists) {
      throw new Error("Deliveryman already exists");
    }

    // Encrypt password
    const hashPassword = await hash(password, 10) 

    // Save Deliveryman
    return await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })
  }
}
