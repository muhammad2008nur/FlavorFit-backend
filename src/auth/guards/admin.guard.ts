import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ForbiddenError } from "@nestjs/apollo";
import { RequestUser } from "../auth.interface";
import { Reflector } from "@nestjs/core";
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<{ req: RequestUser }>().req.user;
    if (user?.role !== "ADMIN") {
      throw new ForbiddenError(
        "You do not have permission to access this resource",
      );
    }
    return true;
  }
}
