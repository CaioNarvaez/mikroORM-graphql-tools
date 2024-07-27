import { CalendarDate } from 'calendar-date';
import { GraphQLScalarType, Kind } from "graphql";

export const ScalarCalendarDate = new GraphQLScalarType({
  name: 'CalendarDate',
  description: 'A custom scalar type for calendar date',
  serialize(value: any) {
    // Serialize value to send to the client
    if (value instanceof CalendarDate) {
      return value.toString();
    }

    if(typeof value === 'string') {
        const date = new CalendarDate(value);
        return date.toString();
    }

    throw new Error('Value is not an instance of string or calendar date');
  },
  parseValue(value: any) {
    // Parse value from the client input
    if (value instanceof CalendarDate) {
        return value;
    }

    if(typeof value !== 'string') {
        throw new Error('Value is not an instance of string or calendar date');
    }

    return new CalendarDate(value);
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      // Parse value from AST literal
      throw new Error('Only validate strings as CalendarDate');
    }
    try {
        return new CalendarDate(ast.value);
      } catch (err) {
        throw new Error(
          `String does not represent a valid CalendarDate`,
        );
    }
  },
});
