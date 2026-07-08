import { Field, InputType } from "@nestjs/graphql";
import { ProfileInputUpdate } from "./profile-update.input";
import { BodyMeasurementInputUpdate } from "./measurements-update.input";
@InputType()
export class UserInputUpdate {
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field(() => ProfileInputUpdate, { nullable: true })
  profile?: ProfileInputUpdate;
  @Field(() => BodyMeasurementInputUpdate, { nullable: true })
  measurements?: BodyMeasurementInputUpdate;
}
