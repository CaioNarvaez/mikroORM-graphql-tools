import { AuthorFilterField, AuthorFilterGroup } from "../generated/resolvers-types";
import { FilterGroupOperation, FilterOperation, FiltersMap } from "./helpers/types";
import { convertFilters } from "./helpers";

const authorFiltersMap: FiltersMap<AuthorFilterField> = {
    NAME: {
      getFilter: (operation: FilterOperation, value: string) => {
        switch (operation) {
          case FilterOperation.EQ:
            return { name: value };
          case FilterOperation.NE:
            return { name : { $ne: value } };
          default:
            throw new Error(`Invalid filter operation ${operation}`);
        }
      }
    },
    EMAIL: {
      getFilter: (operation: FilterOperation, value: string) => {
        switch (operation) {
          case FilterOperation.EQ:
            return { email: value };
          case FilterOperation.NE:
            return { email : { $ne: value } };
          default:
            throw new Error(`Invalid filter operation ${operation}`);
        }
      }
    }
};



// ToDo: transform it in a generic util function
export function getAuthorFilterQuery(filter: AuthorFilterGroup | undefined) {
    if(!filter) {
        return {};
    }

    const filters = convertFilters(filter.filters as { field: AuthorFilterField; operation: FilterOperation; value: string }[], authorFiltersMap);

    if(filter.operation === FilterGroupOperation.OR) {
        return {
            $or: [...filters]
        }
    }

    return {
        $and: [...filters]
    }
}