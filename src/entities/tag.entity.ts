import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/postgresql';
import { Book } from 'entities/book.entity';
import { Field, ObjectType } from 'type-graphql';
import { Base } from 'utils/entities/base.entity';

@ObjectType()
@Entity()
export class Tag extends Base {
  @Field()
  @Property()
  public name: string;

  @Field(() => [Book])
  @ManyToMany(() => Book, (b: Book) => b.tags)
  public books = new Collection<Book>(this);

  constructor(props: { name: string }) {
    super(props);
    this.name = props.name;
  }
}
