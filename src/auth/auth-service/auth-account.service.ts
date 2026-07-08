import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";
import { generateToken } from "src/utils/generate-token";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../../email/email.service";
import { hash } from "argon2";
@Injectable()
export class AuthAccountService {
  constructor(
    private userService: UsersService,
    private prisma: PrismaService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}
  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          gt: new Date(Date.now()),
        },
      },
    });
    if (!user) {
      throw new BadRequestException(
        "Invalid or expired email verification token",
      );
    }
    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        emailVerificationToken: null,
        emailVerificationTokenExpiresAt: null,
        isEmailVerified: true,
      },
    });
    return true;
  }
  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return true;
    const resetPasswordToken = generateToken();
    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 30),
      },
    });
    const resetUrl = `${this.configService.getOrThrow<string>("CLIENT_URL")}/auth/reset-password?token=${resetPasswordToken}`;
    await this.emailService.resetPasswordEmail(user.email, resetUrl);
    return true;
  }
  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: {
          gt: new Date(),
        },
      },
    });
    if (!user) {
      throw new BadRequestException("Invalid or expired password reset token");
    }
    await this.prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: await hash(newPassword),
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    });
    return true;
  }
}
