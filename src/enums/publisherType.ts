import { registerEnumType } from "type-graphql";

export enum PublisherType {
  LOCAL = 'LOCAL',
  GLOBAL = 'GLOBAL',
}

registerEnumType(PublisherType, {
  name: 'PublisherType',
  description: 'Type of the publisher',
});