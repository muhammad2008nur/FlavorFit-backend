import { Injectable } from "@nestjs/common";
// import { randomUUID } from "crypto";
import { path } from "app-root-path";
import { v4 } from "uuid";
import { ensureDir, writeFile } from "fs-extra";
import * as iconv from "iconv-lite";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class MediaUploadService {
  constructor(private readonly prisma: PrismaService) {}
  async saveAvatar(file: Express.Multer.File, userId: string) {
    const uploadFolder = `${path}/uploads/avatars`;
    await ensureDir(uploadFolder);
    const original = iconv.decode(
      Buffer.from(file.originalname, "binary"),
      "utf-8",
    );
    const safeName = original.replace(/[^\w.-]+/g, "-").toLowerCase();
    const name = `${v4().slice(0, 5)}-${safeName}`;
    await writeFile(`${uploadFolder}/${name}`, file.buffer);
    const url = `/uploads/avatars/${name}`;
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile: {
          upsert: {
            create: { avatarUrl: url },
            update: { avatarUrl: url },
          },
        },
      },
    });
  }
}
