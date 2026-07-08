import { Mutation, Resolver, Args, Context, Query } from "@nestjs/graphql";
import { AuthService } from "./auth-service/auth.service";
import { AuthInput } from "./inputs/auth.input";
import { AuthResponse } from "./auth.interface";
import { type GqlContext } from "src/app.interface";
import { BadRequestException } from "@nestjs/common";
import { VerifyCaptcha } from "./decorators/captcha.decorator";
import { AuthCookieService } from "./auth-service/auth-cookie.service";
import { AuthAccountService } from "./auth-service/auth-account.service";
import { RequestPasswordResetTokenInput } from "./inputs/request-password-reset.input";
import { ResetPasswordInput } from "./inputs/reset-password.input";
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookieService: AuthCookieService,
    private readonly authAccountService: AuthAccountService,
  ) {}
  @Mutation(() => AuthResponse)
  @VerifyCaptcha()
  async register(
    @Args("data") input: AuthInput,
    @Context() { res }: GqlContext,
  ) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.register(input);
    this.authCookieService.toggleRefreshTokenCookie(res, refreshToken);
    this.authCookieService.toggleAccessTokenCookie(res, accessToken);
    return response;
  }
  @Mutation(() => AuthResponse)
  @VerifyCaptcha()
  async login(@Args("data") input: AuthInput, @Context() { res }: GqlContext) {
    const { refreshToken, accessToken, ...response } =
      await this.authService.login(input);
    this.authCookieService.toggleRefreshTokenCookie(res, refreshToken);
    this.authCookieService.toggleAccessTokenCookie(res, accessToken);
    return response;
  }
  @Query(() => AuthResponse)
  async newTokens(@Context() { req, res }: GqlContext) {
    const initialRefreshToken =
      req.cookies?.[this.authCookieService.REFRESH_TOKEN_NAME];

    if (!initialRefreshToken) {
      this.authCookieService.toggleRefreshTokenCookie(res, null);
      this.authCookieService.toggleAccessTokenCookie(res, null);
      throw new BadRequestException("Refresh token is missing");
    }
    const { refreshToken, accessToken, ...response } =
      await this.authCookieService.getNewTokens(initialRefreshToken);

    this.authCookieService.toggleRefreshTokenCookie(res, refreshToken);
    this.authCookieService.toggleAccessTokenCookie(res, accessToken);
    return response;
  }
  @VerifyCaptcha()
  @Mutation(() => Boolean)
  async resetPassword(
    @Args("data", { type: () => ResetPasswordInput }) input: ResetPasswordInput,
  ) {
    return await this.authAccountService.resetPassword(
      input.token,
      input.newPassword,
    );
  }
  @VerifyCaptcha()
  @Mutation(() => Boolean)
  async requestPasswordReset(
    @Args("data", { type: () => RequestPasswordResetTokenInput })
    input: RequestPasswordResetTokenInput,
  ) {
    return await this.authAccountService.requestPasswordReset(input.email);
  }
  @VerifyCaptcha()
  @Mutation(() => Boolean)
  async verifyEmail(@Args("token", { type: () => String }) token: string) {
    return this.authAccountService.verifyEmail(token);
  }
  @Mutation(() => Boolean)
  logout(@Context() { res }: GqlContext) {
    this.authCookieService.toggleRefreshTokenCookie(res, null);
    this.authCookieService.toggleAccessTokenCookie(res, null);
    return true;
  }
}
