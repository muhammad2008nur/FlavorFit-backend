import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RecipesService } from "./recipes.service";

import { Auth } from "src/auth/decorators/auth.decorator";
import { UserCurrent } from "src/auth/decorators/current-user.decorator";
import { AdminRecipesService } from "./admin-recipes.service";
import { RecipeModel } from "./models/recipe.model";
import { RecipeInputCreateAndUpdate } from "./inputs/recipe.input";
@Resolver()
export class RecipesResolver {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly adminRecipesService: AdminRecipesService,
  ) {}

  @Query(() => RecipeModel, {
    name: "recipeBySlug",
  })
  getBySlug(@Args("slug") slug: string) {
    return this.recipesService.getBySlug(slug);
  }

  @Query(() => [RecipeModel], {
    name: "adminRecipes",
  })
  getAllAdmin() {
    return this.adminRecipesService.getAll();
  }

  @Query(() => RecipeModel, {
    name: "recipeById",
  })
  @Auth("ADMIN")
  getById(@Args("id") id: string) {
    return this.adminRecipesService.getById(id);
  }

  @Mutation(() => RecipeModel)
  @Auth("ADMIN")
  createRecipe(
    @UserCurrent("id") authorId: string,
    @Args("input") input: RecipeInputCreateAndUpdate,
  ) {
    return this.adminRecipesService.create(authorId, input);
  }

  @Mutation(() => RecipeModel)
  @Auth("ADMIN")
  updateRecipe(
    @Args("id") id: string,
    @Args("input") input: RecipeInputCreateAndUpdate,
  ) {
    return this.adminRecipesService.update(id, input);
  }

  @Mutation(() => RecipeModel)
  @Auth("ADMIN")
  deleteRecipeById(@Args("id") id: string) {
    return this.adminRecipesService.deleteById(id);
  }
}
