import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/postgresql';
import { AbstractBaseEntity } from './abstractBaseEntity';
import { Book } from './book';

@Entity()
export class Tag extends AbstractBaseEntity {
  @Property()
  public name: string;
  
  @ManyToMany(() => Book, (b: Book) => b.tags)
  public books = new Collection<Book>(this);

  constructor(props: { name: string }) {
    super();
    this.name = props.name;
  }
}
