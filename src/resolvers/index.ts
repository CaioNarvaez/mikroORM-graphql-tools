import { mergeResolvers } from '@graphql-tools/merge';
import { authorResolver } from "./author";
import { bookResolver } from './book';
import { scalarResolver } from './scalars';

export const resolvers = mergeResolvers([
    authorResolver,
    bookResolver,
    scalarResolver,
]);