import { UseGuards } from "@nestjs/common";
import { TurnstileGuard } from "../guards/gql-turnstile.guard";

export const VerifyCaptcha = () => UseGuards(TurnstileGuard);
