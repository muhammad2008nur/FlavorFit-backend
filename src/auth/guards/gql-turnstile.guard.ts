import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Messages } from "nest-cloudflare-turnstile/dist/constants/messages";
import { TurnstileService } from "nest-cloudflare-turnstile/dist/services/turnstile.service";
import type { ITurnstileOptions } from "nest-cloudflare-turnstile/dist/interfaces/turnstile";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { GqlContext } from "src/app.interface";
import { TurnstileValidateResponse } from "../auth.interface";
@Injectable()
export class TurnstileGuard implements CanActivate {
  constructor(
    private readonly turnstileService: TurnstileService,
    @Inject("TurnstileServiceOptions")
    private readonly options: ITurnstileOptions,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const skipValidation = this.options?.skipIf === true;
    // if (skipValidation) return true;
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext<GqlContext>().req;
    const responseToken = request.headers["cf-turnstile-token"];
    if (!responseToken) {
      throw this.options.exceptionFactory
        ? this.options.exceptionFactory("missing")
        : new BadRequestException(Messages.MISSING);
    }

    const { success } = (await this.turnstileService.validateToken(
      responseToken as string,
    )) as TurnstileValidateResponse;
    if (!success) {
      throw this.options.exceptionFactory
        ? this.options.exceptionFactory("invalid")
        : new BadRequestException(Messages.INVALID);
    }

    return success;
  }
}
