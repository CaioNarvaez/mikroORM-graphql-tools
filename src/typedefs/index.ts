import { mergeTypeDefs } from '@graphql-tools/merge';
import { authorTypedef } from "./author";
import { bookTypedefs } from './book';
import { rootTypedef } from './root';
import { scalarTypedefs } from './scalars';

export const typeDefs = mergeTypeDefs([
    rootTypedef,
    ...scalarTypedefs,
    authorTypedef,
    bookTypedefs,
]);