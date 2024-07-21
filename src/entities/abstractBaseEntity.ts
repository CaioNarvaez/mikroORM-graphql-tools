import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { v4 } from 'uuid';

@Entity({ abstract: true })
export class AbstractBaseEntity extends BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  public id: string = v4();

  @Property()
  public createdAt: Date;

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date;

  constructor() {
    super();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
