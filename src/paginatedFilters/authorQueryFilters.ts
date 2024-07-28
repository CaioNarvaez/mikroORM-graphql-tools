import { OrderDefinition } from "@mikro-orm/postgresql";
import { Author, AuthorFilterField, AuthorFilterGroup, AuthorOrderBy, AuthorOrderField, FilterOperation } from "../generated/resolvers-types";
import { FilterQueryOperations, FiltersMap, OrderMap } from "./utils/types";
import { getOrderByQuery } from "./utils";
import { getFilterQuery } from "./utils/getFilterQuery";

const authorOrderMap: OrderMap<AuthorOrderField> = {
  NAME: {
    path: 'name'
  },
};

const authorFiltersMap: FiltersMap<AuthorFilterField> = {
    NAME: {
      getFilter: (operation: FilterOperation, value: string) => {
        switch (operation) {
          case FilterQueryOperations.EQ:
            return { name: value };
          case FilterQueryOperations.NE:
            return { name : { $ne: value } };
          default:
            throw new Error(`Invalid filter operation ${operation}`);
        }
      }
    },
    EMAIL: {
      getFilter: (operation: FilterOperation, value: string) => {
        switch (operation) {
          case FilterQueryOperations.EQ:
            return { email: value };
          case FilterQueryOperations.NE:
            return { email : { $ne: value } };
          default:
            throw new Error(`Invalid filter operation ${operation}`);
        }
      }
    }
};


export function getAuthorOrderBy(orderByGroup: AuthorOrderBy[]) {
  const defaultAuthorOrderBy: OrderDefinition<Author> = { name: 'ASC' };
  return getOrderByQuery<Author, AuthorOrderField>(
    authorOrderMap,
    orderByGroup,
    defaultAuthorOrderBy
  );
}

export function getAuthorFilter(filter: AuthorFilterGroup) {
  return getFilterQuery<AuthorFilterField>(filter, authorFiltersMap);
}
