import { Module } from "@nestjs/common";
import { MediaUploadService } from "./media-upload.service";
import { MediaUploadController } from "./media-upload.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import { path } from "app-root-path";
import { PrismaService } from "src/prisma/prisma.service";
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: "/uploads",
    }),
  ],
  providers: [MediaUploadService, PrismaService],
  controllers: [MediaUploadController],
})
export class MediaUploadModule {}
