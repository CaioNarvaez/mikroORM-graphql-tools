import { FilterGroupOperator, FilterOperation } from "generated/resolvers-types";
import { FiltersMap } from "./types";

type FilterGroup<FieldType extends string> = {
    readonly filters: ReadonlyArray<{ field: FieldType; operation: FilterOperation; value: string }>;
    readonly operation: FilterGroupOperator;
};

function convertFilters<FieldType extends string>(
  filters: { field: FieldType; operation: FilterOperation; value: string }[],
  filtersMap: FiltersMap<FieldType>
) {
  return filters.map(({ field, operation, value }) => {
    const filterObject = filtersMap[field];
    return filterObject.getFilter(operation, value);
  });
}

export function getFilterQuery<FieldType extends string>(
    filterGroup: FilterGroup<FieldType> | undefined,
    filtersMap: FiltersMap<FieldType>
  ) {
    if (!filterGroup) {
      return {};
    }
  
    const { filters, operation } = filterGroup;
    const convertedFilters = convertFilters<FieldType>([...filters], filtersMap);
  
    if (operation === 'OR') {
      return {
        $or: [...convertedFilters]
      };
    }
    return {
      $and: [...convertedFilters]
    };
  }