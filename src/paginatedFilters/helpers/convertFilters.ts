import { FilterOperation, FiltersMap } from "./types";

// Function to convert filters using a generic filter map
export function convertFilters<FieldType extends string>(
  filters: { field: FieldType; operation: FilterOperation; value: string }[],
  filtersMap: FiltersMap<FieldType>
) {
  return filters.map(({ field, operation, value }) => {
    const filterObject = filtersMap[field];
    return filterObject.getFilter(operation, value);
  });
}
