import { Resolvers } from "generated/resolvers-types";
import createSimpleUuid from "utils/helpers/createSimpleUuid.helper";

export const testResolver : Resolvers = {
    Query: {
        tests: () => [],
    },
    Test: {
        id: () => createSimpleUuid(Math.random())
    }
}