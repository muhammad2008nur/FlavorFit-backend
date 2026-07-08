import { InputType } from "@nestjs/graphql";
import { Field, Int } from "@nestjs/graphql";
import { Gender } from "prisma/generated/prisma/enums";
@InputType()
export class ProfileInputUpdate {
  @Field(() => String, { nullable: true })
  fullName?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => String, { nullable: true })
  bio?: string;
}
