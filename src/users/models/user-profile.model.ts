import { Field, Int, registerEnumType } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import {
  ActivityLevel,
  NutritionGoal,
  Gender,
  Role,
} from "prisma/generated/prisma/enums";

registerEnumType(ActivityLevel, { name: "ActivityLevel" });
registerEnumType(NutritionGoal, { name: "NutritionGoal" });
registerEnumType(Gender, { name: "Gender" });
registerEnumType(Role, { name: "Role" });

@ObjectType()
export class BodyMeasurementModel {
  @Field()
  id!: string;
  @Field(() => Int, { nullable: true })
  heightCm?: number;
  @Field(() => Int, { nullable: true })
  weightKg?: number;
  @Field(() => Int, { nullable: true })
  goalWeightKg?: number;
  @Field(() => Int, { nullable: true })
  chestCm?: number;
  @Field(() => Int, { nullable: true })
  waistCm?: number;
  @Field(() => Int, { nullable: true })
  thighCm?: number;

  @Field(() => Int, { nullable: true })
  armCm?: number;
  @Field(() => ActivityLevel, { nullable: true })
  activityLevel?: ActivityLevel;
  @Field(() => NutritionGoal, { nullable: true })
  nutritionGoal?: NutritionGoal;
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class ProfileModel {
  @Field()
  id!: string;
  @Field()
  fullName!: string;
  @Field(() => Gender, { nullable: true })
  gender?: string;
  @Field(() => Int, { nullable: true })
  age?: number;
  @Field({ nullable: true })
  bio?: string;
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}

@ObjectType()
export class UserModel {
  @Field()
  id!: string;
  @Field()
  email!: string;
  @Field(() => Role)
  role!: Role;
  @Field(() => Boolean, { nullable: true })
  isEmailVerified?: boolean;
  @Field(() => ProfileModel, { nullable: true })
  profile?: ProfileModel;
  @Field(() => BodyMeasurementModel, { nullable: true })
  measurements?: BodyMeasurementModel;

  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
