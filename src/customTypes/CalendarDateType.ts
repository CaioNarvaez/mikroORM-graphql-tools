import { Type, Platform, EntityProperty, ValidationError } from '@mikro-orm/postgresql';
import { CalendarDate } from 'calendar-date';

/**
 * A custom type that maps SQL date column to CalendarDate objects.
 */
export class CalendarDateType extends Type<CalendarDate | null, string | null> {

  convertToDatabaseValue(value: CalendarDate | string | undefined | null): string | null {
    if (!value) {
      return null;
    }

    if (value instanceof CalendarDate) {
      return value.toString();
    }

    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return value;
    }

    throw ValidationError.invalidType(CalendarDateType, value, 'JS');
  }

  convertToJSValue(value: CalendarDate | string | undefined | null): CalendarDate | null {
    if (value === null) {
      return value;
    }

    if (value === undefined) {
      return null;
    }

    if (value instanceof CalendarDate) {
      return value;
    }

    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new CalendarDate(value);
    }

    throw ValidationError.invalidType(CalendarDateType, value, 'database');
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return platform.getDateTypeDeclarationSQL(prop.length);
  }

  compareAsType(): string {
    return 'date';
  }

  toJSON(value: CalendarDate | null): CalendarDate | string | null {
    return this.convertToDatabaseValue(value);
  }

}
