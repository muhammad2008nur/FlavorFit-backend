import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class IngredientModel {
  @Field()
  id: string;
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  iconUrl?: string;
  @Field(() => Number, { nullable: true })
  price?: number;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
