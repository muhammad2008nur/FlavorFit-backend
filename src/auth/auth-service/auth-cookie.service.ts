import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenData } from "../auth.interface";
import { UsersService } from "src/users/users.service";
import { Response } from "express";
import { isDev } from "src/utils/is-dev.utils";
@Injectable()
export class AuthCookieService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
    private usersService: UsersService,
  ) {}
  private readonly EXPIRE_HOURS_ACCESS_TOKEN = 1;
  readonly ACCESS_TOKEN_NAME = "accessToken" as const;

  private readonly EXPIRE_DAYS_REFRESH_TOKEN = 3;
  readonly REFRESH_TOKEN_NAME = "refreshToken" as const;
  generateTokens(payload: AuthTokenData) {
    const { id } = payload;
    const accessToken = this.jwt.sign(payload, {
      expiresIn: "1h",
    });
    const refreshToken = this.jwt.sign(
      { id },
      {
        expiresIn: `${this.EXPIRE_DAYS_REFRESH_TOKEN}d`,
      },
    );
    return { accessToken, refreshToken };
  }
  toggleRefreshTokenCookie(response: Response, token: string | null) {
    this.toggleTokenCookie({
      response,
      name: this.REFRESH_TOKEN_NAME,
      token,
      expires: new Date(
        Date.now() + this.EXPIRE_DAYS_REFRESH_TOKEN * 24 * 60 * 60 * 1000,
      ),
    });
  }
  toggleAccessTokenCookie(response: Response, token: string | null) {
    this.toggleTokenCookie({
      response,
      name: this.ACCESS_TOKEN_NAME,
      token,
      expires: new Date(
        Date.now() + this.EXPIRE_HOURS_ACCESS_TOKEN * 60 * 60 * 1000,
      ),
    });
  }

  private toggleTokenCookie({
    response,
    name,
    token,
    expires,
  }: {
    response: Response;
    name:
      | AuthCookieService["REFRESH_TOKEN_NAME"]
      | AuthCookieService["ACCESS_TOKEN_NAME"];
    token: string | null;
    expires: Date;
  }) {
    const isRemoveCookie = !token;
    const expiresIn = isRemoveCookie ? new Date(0) : expires;
    const dev = isDev(this.configService);
    response.cookie(name, token || "", {
      expires: expiresIn,
      httpOnly: true,
      ...(dev && { domain: "localhost" }),
      sameSite: dev ? "lax" : "strict",
      secure: !dev,
    });
  }
  async getNewTokens(refreshToken: string) {
    const result =
      await this.jwt.verifyAsync<Pick<AuthTokenData, "id">>(refreshToken);
    if (!result) throw new BadRequestException("Invalid refresh token");
    const user = await this.usersService.findById(result.id);
    if (!user) throw new NotFoundException("User not found");
    const tokens = this.generateTokens({ id: user.id, role: user.role });
    return { ...tokens, user };
  }
}
