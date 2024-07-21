import { mergeTypeDefs } from '@graphql-tools/merge';
import { testTypedefs } from "./test.typedef";
import { rootTypes } from './rootTypes';

export const typeDefs = mergeTypeDefs([
    rootTypes,
    testTypedefs,
]);