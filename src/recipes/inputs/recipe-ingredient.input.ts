import { Field, ID, InputType } from "@nestjs/graphql";
import { Unit } from "prisma/generated/prisma/enums";
@InputType()
export class RecipeIngredientInput {
  @Field(() => ID)
  ingredientId: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => Unit)
  unit: Unit;
}
