import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

import { IngredientModel } from "../ingredients/models/ingredient.model";
import { Unit } from "prisma/generated/prisma/enums";
import { registerEnumType } from "@nestjs/graphql";
registerEnumType(Unit, {
  name: "Unit",
});
@ObjectType()
export class RecipeIngredientModel {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Float, { nullable: false })
  quantity!: number;

  @Field(() => Unit, { defaultValue: "GRAM", nullable: false })
  unit!: `${Unit}`;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => IngredientModel, { nullable: false })
  ingredient?: IngredientModel;
}
