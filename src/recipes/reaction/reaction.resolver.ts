import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { ReactionService } from "./reaction.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CommentModel } from "./models/comment.model";
import { UserCurrent } from "src/auth/decorators/current-user.decorator";
import { CommentCreateInput, CommentUpdateInput } from "./inputs/comment.input";
import { Role } from "prisma/generated/prisma/enums";
import { ToggleLikeModel } from "./models/toggle-like.model";
@Resolver()
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Mutation(() => CommentModel)
  @Auth()
  createComment(
    @UserCurrent("id") userId: string,
    @Args("input") input: CommentCreateInput,
  ) {
    return this.reactionService.addComment(userId, input);
  }

  @Mutation(() => CommentModel)
  @Auth()
  updateComment(
    @UserCurrent("id") userId: string,
    @UserCurrent("role") userRole: Role,
    @Args("commentId") commentId: string,
    @Args("input") input: CommentUpdateInput,
  ) {
    return this.reactionService.editComment(userId, commentId, userRole, input);
  }

  @Mutation(() => CommentModel)
  @Auth()
  deleteComment(
    @UserCurrent("id") userId: string,
    @UserCurrent("role") userRole: Role,
    @Args("commentId") commentId: string,
  ) {
    return this.reactionService.deleteComment(userId, userRole, commentId);
  }

  @Mutation(() => ToggleLikeModel)
  @Auth()
  toggleLike(
    @UserCurrent("id") userId: string,
    @Args("recipeId") recipeId: string,
  ) {
    return this.reactionService.toggleLike(userId, recipeId);
  }
}
