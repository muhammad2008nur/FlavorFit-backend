import { Request, Response } from "express";
import { RequestWithCookies } from "./auth/auth.interface";
export interface GqlContext {
  req: RequestWithCookies;
  res: Response;
}
