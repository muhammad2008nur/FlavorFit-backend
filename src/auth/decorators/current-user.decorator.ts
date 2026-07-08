import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { userCurrent } from "../auth.interface";
import { RequestUser } from "../auth.interface";
export const UserCurrent = createParamDecorator(
  (data: keyof userCurrent, ctx: ExecutionContext) => {
    let user: userCurrent | null | undefined = null;
    if (ctx.getType<GqlContextType>() === "graphql") {
      const context = GqlExecutionContext.create(ctx);
      user = context.getContext<{ req: RequestUser }>().req.user;
    } else {
      user = ctx.switchToHttp().getRequest<RequestUser>().user;
    }
    if (!user) return null;

    return data ? user[data] : user;
  },
);
