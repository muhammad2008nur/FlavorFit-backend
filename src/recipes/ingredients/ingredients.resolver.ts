import { Resolver } from "@nestjs/graphql";
import { IngredientsService } from "./ingredients.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { Query, Mutation } from "@nestjs/graphql";
import { IngredientModel } from "./models/ingredient.model";
import { Args } from "@nestjs/graphql";
import { IngredientInputCreateAndUpdate } from "./inputs/ingredient-create-update.input";
@Resolver()
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(() => [IngredientModel], { name: "Ingredients" })
  @Auth("ADMIN")
  async getAllIngredients() {
    return await this.ingredientsService.getAll();
  }
  @Mutation(() => IngredientModel, { name: "IngredientDelete" })
  @Auth("ADMIN")
  async deleteById(@Args("id") id: string) {
    return await this.ingredientsService.deleteById(id);
  }
  @Query(() => IngredientModel, { name: "Ingredient" })
  @Auth("ADMIN")
  async getById(@Args("id") id: string) {
    return await this.ingredientsService.getById(id);
  }
  @Mutation(() => IngredientModel)
  @Auth("ADMIN")
  async createIngredient(@Args("data") input: IngredientInputCreateAndUpdate) {
    return await this.ingredientsService.create(input);
  }

  @Mutation(() => IngredientModel)
  @Auth("ADMIN")
  async updateIngredient(
    @Args("id") id: string,
    @Args("data") input: IngredientInputCreateAndUpdate,
  ) {
    return await this.ingredientsService.update(id, input);
  }
}
