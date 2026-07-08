import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { UserModel } from "src/users/models/user-profile.model";
import { Difficulty } from "prisma/generated/prisma/enums";
import { NutritionFact } from "./nutrition-fact.model";
import { RecipeIngredientModel } from "./recipe-ingredient.model";
import { RecipeStepModel } from "./recipe-step.model";
import { RecipeTagModel } from "./recipe-tag.model";
@ObjectType()
export class RecipeModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  slug!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => Int, { nullable: false })
  calories!: number;

  @Field(() => Int, { nullable: false })
  cookingTime!: number;

  @Field(() => Difficulty, { nullable: false })
  difficulty!: Difficulty;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => UserModel, { nullable: false })
  author?: UserModel;

  @Field(() => NutritionFact, { nullable: true })
  nutritionFact?: NutritionFact;

  @Field(() => [RecipeTagModel], { nullable: true })
  tags?: RecipeTagModel[];

  @Field(() => [RecipeStepModel], { nullable: true })
  recipeSteps?: RecipeStepModel[];

  @Field(() => [RecipeIngredientModel], { nullable: true })
  recipeIngredients?: RecipeIngredientModel[];

  @Field(() => Int, { nullable: true })
  likes?: number;
}
