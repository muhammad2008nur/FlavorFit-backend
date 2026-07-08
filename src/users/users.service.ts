import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserInputUpdate } from "./inputs/user-update.input";
import { hash } from "argon2";
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
  }
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        measurements: true,
      },
    });
  }
  async updateProfile(id: string, input: UserInputUpdate) {
    const { profile, measurements, password, ...data } = input;
    // TODO: exist user

    return this.prisma.user.update({
      where: { id },
      data: {
        ...(data.email && { email: data.email }),
        ...(password && { password: await hash(password) }),
        ...(profile && {
          profile: {
            upsert: {
              create: profile,
              update: profile,
            },
          },
        }),
        ...(measurements && {
          measurements: {
            upsert: {
              create: measurements,
              update: measurements,
            },
          },
        }),
      },
      include: {
        measurements: true,
        profile: true,
      },
    });
  }
}
