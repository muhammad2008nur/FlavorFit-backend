import { Resolver, Query, Mutation } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserModel } from "./models/user-profile.model";
import { UserCurrent } from "src/auth/decorators/current-user.decorator";
import { Auth } from "src/auth/decorators/auth.decorator";
import { UserInputUpdate } from "./inputs/user-update.input";
import { Args } from "@nestjs/graphql";
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => UserModel, { name: "me" })
  @Auth()
  getProfile(@UserCurrent("id") id: string) {
    return this.usersService.findById(id);
  }
  @Mutation(() => UserModel)
  @Auth()
  async updateProfile(
    @UserCurrent("id") id: string,
    @Args("data") input: UserInputUpdate,
  ) {
    return await this.usersService.updateProfile(id, input);
  }
}
