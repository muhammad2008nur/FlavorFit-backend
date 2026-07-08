import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class IngredientInputCreateAndUpdate {
  @Field({ nullable: false })
  name!: string;
  @Field({ nullable: false })
  iconUrl!: string;
  @Field(() => Number, { nullable: false })
  price!: number;
  @Field({ nullable: false })
  content!: string;
}

//   model Ingredient {
//     id String @id @default(cuid())

//     iconUrl String  @map("icon_url")
//     content String
//     price   Decimal

//     resipesIngredient RecipeIngredient[]

//     createdAt DateTime @default(now()) @map("created_at")
//     updatedAt DateTime @updatedAt @map("updated_at")

//     @@map("ingredients")
// }
