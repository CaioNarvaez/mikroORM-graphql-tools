import { mergeResolvers } from '@graphql-tools/merge';
import { authorResolver } from "./author";
import { bookResolver } from './book';

export const resolvers = mergeResolvers([
    authorResolver,
    bookResolver,
]);