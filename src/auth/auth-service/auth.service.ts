import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthInput } from "../inputs/auth.input";
import { hash } from "argon2";
import { UsersService } from "src/users/users.service";
import { Response } from "express";
import { verify } from "argon2";
import { generateToken } from "src/utils/generate-token";
import { EmailService } from "../../email/email.service";
import { AuthCookieService } from "./auth-cookie.service";
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwt: JwtService,
    private usersService: UsersService,
    private emailService: EmailService,
    private authCookieService: AuthCookieService,
  ) {}

  async register(input: AuthInput) {
    const email = input.email.toLowerCase();
    const existingUser = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: "insensitive" } },
    });
    if (existingUser) {
      throw new BadRequestException("User with this email already exists");
    }
    const emailVerificationToken = generateToken();
    const user = await this.prisma.user.create({
      data: {
        email,
        password: await hash(input.password),
        emailVerificationToken,
        emailVerificationTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });
    const tokens = this.authCookieService.generateTokens({
      id: user.id,
      role: user.role,
    });
    // const verificationUrl = `${this.configService.getOrThrow<string>("CLIENT_URL")}/auth/verify-email?token=${emailVerificationToken}`;
    // await this.emailService.verifyEmail(user.email, verificationUrl);
    return { user, ...tokens };
  }
  async VerifyEmail(token: string) {
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
      },
    });
    return true;
  }

  async login(input: AuthInput) {
    const user = await this.validateUser(input);
    const tokens = this.authCookieService.generateTokens({
      id: user.id,
      role: user.role,
    });
    return { ...tokens, user };
  }
  private async validateUser(input: AuthInput) {
    const email = input.email;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("invalid login or password");
    }
    const isPasswordValid = await verify(user.password, input.password);
    if (!isPasswordValid) {
      throw new NotFoundException("invalid login or password");
    }
    return user;
  }
}
