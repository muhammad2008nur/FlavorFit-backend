import { Module } from '@nestjs/common';
import { MeadiaUploadService } from './meadia-upload.service';
import { MeadiaUploadController } from './meadia-upload.controller';

@Module({
  providers: [MeadiaUploadService],
  controllers: [MeadiaUploadController]
})
export class MeadiaUploadModule {}
