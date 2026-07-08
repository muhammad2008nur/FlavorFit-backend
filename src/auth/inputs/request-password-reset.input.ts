import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class RequestPasswordResetTokenInput {
  @Field()
  email!: string;
}
