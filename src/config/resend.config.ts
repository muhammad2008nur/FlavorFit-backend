import { ConfigService } from "@nestjs/config";

export const getResendConfig = (configService: ConfigService) => {
  return {
    apiKey: configService.getOrThrow<string>("RESEND_API_KEY"),
  };
};
