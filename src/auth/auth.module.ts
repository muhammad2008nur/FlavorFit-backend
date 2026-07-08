import { Module } from "@nestjs/common";
import { AuthService } from "./auth-service/auth.service";
import { AuthResolver } from "./auth.resolver";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJwtConfig } from "src/config/jwt.config";
import { UsersModule } from "src/users/users.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { EmailModule } from "src/email/email.module";
import { AuthAccountService } from "./auth-service/auth-account.service";
import { AuthCookieService } from "./auth-service/auth-cookie.service";
import { TurnstileGuard } from "./guards/gql-turnstile.guard";
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UsersModule,
    EmailModule,
  ],
  providers: [
    JwtStrategy,
    AuthService,
    AuthResolver,
    AuthAccountService,
    AuthCookieService,
    TurnstileGuard,
  ],
})
export class AuthModule {}
