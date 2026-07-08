import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { IngredientInputCreateAndUpdate } from "./inputs/ingredient-create-update.input";

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    return this.prisma.ingredient.findMany();
  }

  async getById(id: string) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }

    return ingredient;
  }
  async deleteById(id: string) {
    try {
      const ingredient = await this.prisma.ingredient.delete({
        where: { id },
      });
      return ingredient;
    } catch (e) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
  }

  async create(data: IngredientInputCreateAndUpdate) {
    return this.prisma.ingredient.create({
      data: {
        name: data.name,
        iconUrl: data.iconUrl,
        price: data.price,
        content: data.content,
      },
    });
  }

  async update(id: string, data: IngredientInputCreateAndUpdate) {
    try {
      const ingredient = await this.prisma.ingredient.update({
        where: { id },
        data,
      });
      return ingredient;
    } catch (e) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
  }
}
