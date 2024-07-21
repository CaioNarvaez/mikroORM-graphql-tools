import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "resolvers";
import { typeDefs } from "typedefs";

export const schema = makeExecutableSchema({typeDefs, resolvers});