import { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { Response, Request } from "express";

interface GraphQLContext {
  req: Request;
  res: Response;
}

export const getGraphQLConfig = (
  configService: ConfigService,
): ApolloDriverConfig => ({
  autoSchemaFile: true,
  sortSchema: true,
  playground: configService.get<string>("NODE_ENV") === "development",
  context: ({ res, req }: GraphQLContext): GraphQLContext => ({ res, req }),
});
