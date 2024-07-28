import { OrderDefinition } from "@mikro-orm/postgresql";
import { OrderMap } from "./types";

type OrderBy<FieldType extends string> = {
  field: FieldType;
  direction: 'ASC' | 'DESC';
};

export function getOrderByQuery<Entity, FieldType extends string>(
  orderMap: OrderMap<FieldType>,
  orderByGroup: OrderBy<FieldType>[],
  defaultOrderBy: OrderDefinition<Entity>
): OrderDefinition<Entity> {
  let orderByQuery: OrderDefinition<Entity> = {};

  for (const orderBy of orderByGroup) {
    const { path } = orderMap[orderBy.field];
    orderByQuery = { ...orderByQuery, [path as keyof Entity]: orderBy.direction };
  }

  // fallback to default if orderBy is empty
  return Object.keys(orderByQuery).length === 0 ? defaultOrderBy : orderByQuery;
}