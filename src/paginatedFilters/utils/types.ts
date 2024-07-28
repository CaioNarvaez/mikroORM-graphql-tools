import { FilterOperation } from "generated/resolvers-types";

// Define the filter operations
export enum FilterQueryOperations {
    EQ = 'EQ',
    NE = 'NE',
    LT = 'LT',
    LTE = 'LTE',
    GT = 'GT',
    GTE = 'GTE',
    IN = 'IN',
    NIN = 'NIN',
    LIKE = 'LIKE'
}

// Define a type for the filter function
export type FilterFunction = (operation: FilterOperation, value: string) => object;

// Define a type for the filter object
export type FilterObject = {
    getFilter: FilterFunction;
};

// Define a type for the filter map
export type FiltersMap<FieldType extends string> = {
    [key in FieldType]: FilterObject;
};

export type OrderMap<FieldType extends string> = {
    [key in FieldType]: { path: string };
};