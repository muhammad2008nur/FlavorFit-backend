import { Module } from "@nestjs/common";
import { IngredientsService } from "./ingredients.service";
import { IngredientsResolver } from "./ingredients.resolver";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [IngredientsService, IngredientsResolver],
})
export class IngredientsModule {}
