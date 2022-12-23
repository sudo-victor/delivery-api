import { hash } from 'bcrypt'

import { prisma } from "../../../../infra/database/prisma/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username}: ICreateClient) {
    // Validate if user already exists
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    });

    if (clientExists) {
      throw new Error("Client already exists");
    }

    // Encrypt password
    const hashPassword = await hash(password, 10) 

    // Save client
    return await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })
  }
}
