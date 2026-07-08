import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CommentCreateInput, CommentUpdateInput } from "./inputs/comment.input";
import { ForbiddenError } from "@nestjs/apollo";
import { Role } from "prisma/generated/prisma/enums";

@Injectable()
export class ReactionService {
  constructor(private readonly prisma: PrismaService) {}
  async toggleLike(userId: string, recipeId: string) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_recipeId: {
          recipeId,
          userId,
        },
      },
    });
    if (existingLike) {
      await this.prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return { liked: false };
    } else {
      await this.prisma.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          recipe: {
            connect: {
              id: recipeId,
            },
          },
        },
      });
      return { liked: true };
    }
  }
  async addComment(userId: string, input: CommentCreateInput) {
    return await this.prisma.comment.create({
      data: {
        content: input.content,
        author: {
          connect: {
            id: userId,
          },
        },
        recipe: {
          connect: {
            id: input.recipeId,
          },
        },
      },
    });
  }
  async editComment(
    userId: string,
    commentId: string,
    userRole: Role,
    input: CommentUpdateInput,
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment || (userId !== comment.authorId && userRole !== Role.ADMIN)) {
      throw new ForbiddenError("Comment not found or unauthorized");
    }
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: input.content,
      },
      include: {
        author: true,
      },
    });
  }
  async deleteComment(userId: string, userRole: Role, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment || (userId !== comment.authorId && userRole !== Role.ADMIN)) {
      throw new ForbiddenError("Comment not found or unauthorized");
    }
    return await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
