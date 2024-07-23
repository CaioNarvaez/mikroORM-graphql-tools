import { Embeddable, Property } from "@mikro-orm/postgresql";

@Embeddable()
export class Social {

  @Property()
  twitter?: string;

  @Property()
  facebook?: string;

  @Property()
  linkedin?: string;

}