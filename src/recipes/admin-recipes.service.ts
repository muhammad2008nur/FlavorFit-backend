import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RecipeInputCreateAndUpdate } from "./inputs/recipe.input";
@Injectable()
export class AdminRecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.recipe.findMany();
  }
  // admin only
  async getById(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException(`recipe with ID ${id} not found`);
    }

    return recipe;
  }

  create(
    authorId: string,
    {
      recipeSteps,
      nutritionFact,
      ingredients,
      tags,
      ...data
    }: RecipeInputCreateAndUpdate,
  ) {
    return this.prisma.recipe.create({
      data: {
        ...data,
        author: {
          connect: { id: authorId },
        },
        ...(!!nutritionFact && {
          nutritionFact: {
            create: nutritionFact,
          },
        }),
        ...(!!recipeSteps && {
          recipeSteps: {
            create: recipeSteps,
          },
        }),
        ...(!!ingredients?.length && {
          recipeIngredients: {
            create: ingredients.map((item) => ({
              ingredientId: item.ingredientId,
              quantity: item.quantity,
              unit: item.unit,
            })),
          },
        }),
        ...(!!tags?.length && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag.name },
              create: { name: tag.name },
            })),
          },
        }),
      },
    });
  }

  update(
    id: string,
    {
      recipeSteps,
      nutritionFact,
      ingredients,
      tags,
      ...data
    }: RecipeInputCreateAndUpdate,
  ) {
    return this.prisma.recipe.update({
      where: { id },
      data: {
        ...data,
        ...(nutritionFact && {
          nutritionFact: {
            upsert: {
              create: nutritionFact,
              update: nutritionFact,
            },
          },
        }),
        ...(recipeSteps && {
          recipeSteps: {
            deleteMany: {},
            create: recipeSteps.map((step) => ({
              order: step.order,
              title: step.title,
              description: step.description,
            })),
          },
        }),
        ...(!!ingredients?.length && {
          recipeIngredients: {
            create: ingredients.map((item) => ({
              ingredientId: item.ingredientId,
              quantity: item.quantity,
              unit: item.unit,
            })),
          },
        }),
        ...(tags && {
          tags: {
            set: [],
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag.name },
              create: { name: tag.name },
            })),
          },
        }),
      },
    });
  }

  // admin only
  deleteById(id: string) {
    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}
