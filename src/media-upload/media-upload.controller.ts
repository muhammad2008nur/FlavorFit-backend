/// <reference types="multer" />
import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { MediaUploadService } from "../media-upload/media-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { UserCurrent } from "src/auth/decorators/current-user.decorator";
// import { UserCurrent } from "src/auth/decorators/current-user.decorator";

@Controller("media-upload")
export class MediaUploadController {
  constructor(private readonly mediaUpload: MediaUploadService) {}
  @HttpCode(200)
  @Post("avatar")
  @Auth()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        fileSize: 50 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadAvatar(
    @UserCurrent("id") userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.mediaUpload.saveAvatar(file, userId);
  }
}
