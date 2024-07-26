import { mergeTypeDefs } from '@graphql-tools/merge';
import { authorTypedef } from "./author";
import { bookTypedefs } from './book';
import { rootTypedef } from './root';

export const typeDefs = mergeTypeDefs([
    rootTypedef,
    authorTypedef,
    bookTypedefs,
]);