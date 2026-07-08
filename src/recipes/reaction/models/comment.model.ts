import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentModel {
  @Field({ nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  content!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;
  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
