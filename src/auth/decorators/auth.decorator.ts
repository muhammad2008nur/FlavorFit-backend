import { applyDecorators } from "@nestjs/common";
import { GqlAuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { Role } from "prisma/generated/prisma/enums";
import { UseGuards } from "@nestjs/common";

export const Auth = (role: Role = Role.USER) => {
  if (role === Role.ADMIN) {
    return applyDecorators(UseGuards(GqlAuthGuard, AdminGuard));
  } else {
    return applyDecorators(UseGuards(GqlAuthGuard));
  }
};
