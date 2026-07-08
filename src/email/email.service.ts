import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { render } from "@react-email/render";
import { ResendService } from "nestjs-resend";
import ResetPasswordEmail from "./templates/reset-password";
import VerificationEmail from "./templates/verification-email";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly resend: ResendService) {}

  private async send(to: string, subject: string, html: string) {
    const result = await this.resend.send({
      from: "FlavorFit <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (result.error) {
      this.logger.error(result.error.message, result.error);
      throw new InternalServerErrorException("Failed to send email");
    }

    return result.data;
  }

  async verifyEmail(email: string, url: string) {
    const html = await render(VerificationEmail({ url }));

    return this.send(email, "Подтверждение email", html);
  }

  async resetPasswordEmail(email: string, url: string) {
    const html = await render(ResetPasswordEmail({ url }));

    return this.send(email, "Сброс пароля", html);
  }
}
