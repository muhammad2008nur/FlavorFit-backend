import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ToggleLikeModel {
  @Field(() => Boolean)
  liked!: boolean;
}
