import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "prisma/generated/prisma/enums";
import { Request } from "express";
import { UserModel } from "src/users/models/user-profile.model";
export interface AuthTokenData {
  id: string;
  role: Role;
}

export type userCurrent = Omit<UserModel, "password">;

export interface RequestUser {
  user?: userCurrent;
}

export interface RequestWithCookies extends Request {
  cookies: Record<string, string | undefined>;
}

@ObjectType()
export class AuthResponse {
  @Field(() => UserModel)
  user!: UserModel;
}

export interface TurnstileValidateResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  metadata?: {
    ephemeral_id?: string;
  };
}
