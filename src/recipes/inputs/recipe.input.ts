import { InputType } from "@nestjs/graphql";
import { Field, Int } from "@nestjs/graphql";
import { Difficulty } from "prisma/generated/prisma/enums";
import { registerEnumType } from "@nestjs/graphql";
import { NutritionFactInputCreateAndUpdate } from "./nutrition-fact.input";
import { RecipeStepInput } from "./step.input";
import { RecipeIngredientInput } from "./recipe-ingredient.input";
import { RecipeTagInput } from "./tag.input";
registerEnumType(Difficulty, {
  name: "Difficulty",
});

@InputType()
export class RecipeInputCreateAndUpdate {
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

  @Field(() => NutritionFactInputCreateAndUpdate, {
    nullable: true,
  })
  nutritionFact?: NutritionFactInputCreateAndUpdate;

  @Field(() => [RecipeTagInput], { nullable: true })
  tags?: RecipeTagInput[];
  @Field(() => [RecipeStepInput], { nullable: true })
  recipeSteps?: RecipeStepInput[];

  @Field(() => [RecipeIngredientInput], {
    nullable: true,
  })
  ingredients?: RecipeIngredientInput[];
}
