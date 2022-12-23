import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../infra/database/prisma/prismaClient";

interface IAuthenticateClientUseCase {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClientUseCase) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })
    if (!client) {
      throw new Error("Username or password invalid!")
    }

    const passwordMatch = await compare(password, client.password)
    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    const payload = {
      username
    }
    const token = sign(payload, process.env.SECRET_KEY as string, {
      subject: client.id,
      expiresIn: "1d"
    })

    return token
  }
}