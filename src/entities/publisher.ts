import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/postgresql';
import { PublisherType } from '../enums/publisherType';
import { AbstractBaseEntity } from './abstractBaseEntity';
import { Book } from './book';

@Entity()
export class Publisher extends AbstractBaseEntity {
  @Property()
  public name: string;

  @Enum(() => PublisherType)
  public type: PublisherType;

  @OneToMany(() => Book, (b: Book) => b.publisher)
  public books = new Collection<Book>(this);

  constructor(props: { name: string, type: PublisherType}) {
    super();
    this.name = props.name;
    this.type = props.type;
  }
}
