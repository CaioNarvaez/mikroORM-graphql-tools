import { mergeTypeDefs } from '@graphql-tools/merge';
import { authorTypedef } from "./author";
import { bookTypedefs } from './book';

export const typeDefs = mergeTypeDefs([
    authorTypedef,
    bookTypedefs,
]);