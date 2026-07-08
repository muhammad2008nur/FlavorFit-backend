import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RecipesModule } from "./recipes/recipes.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { getGraphQLConfig } from "./config/graphql.config";
import { OrdersModule } from "./orders/orders.module";
import { TurnstileModule } from "nest-cloudflare-turnstile";
import { getTurnStileConfig } from "./config/turnstile.config";
import { ResendModule } from "nestjs-resend";
import { getResendConfig } from "./config/resend.config";
import { EmailModule } from "./email/email.module";
import { MeadiaUploadModule } from './meadia-upload/meadia-upload.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RecipesModule,
    PrismaModule,
    OrdersModule,
    TurnstileModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTurnStileConfig,
      inject: [ConfigService],
    }),
    ResendModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getResendConfig,
      inject: [ConfigService],
    }),
    EmailModule,
    MeadiaUploadModule,
  ],
  providers: [AppService],
})
export class AppModule {}
