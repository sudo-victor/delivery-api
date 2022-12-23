import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../infra/database/prisma/prismaClient";

interface IAuthenticateDeliverymanUseCase {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliverymanUseCase) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })
    if (!deliveryman) {
      throw new Error("Username or password invalid!")
    }

    const passwordMatch = await compare(password, deliveryman.password)
    if (!passwordMatch) {
      throw new Error("Username or password invalid!")
    }

    const payload = {
      username
    }
    const token = sign(payload, process.env.SECRET_KEY as string, {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
  }
}