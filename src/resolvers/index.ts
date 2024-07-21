import { mergeResolvers } from '@graphql-tools/merge';
import { testResolver } from "./test.resolver";

export const resolvers = mergeResolvers([
    testResolver,
]);