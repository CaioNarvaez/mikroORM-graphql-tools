import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/postgresql';
import { PublisherType } from 'contracts/enums/publisherType.enum';
import { Book } from 'entities/book.entity';
import { Field, ObjectType } from 'type-graphql';
import { Base } from 'utils/entities/base.entity';

@ObjectType()
@Entity()
export class Publisher extends Base {
  @Field()
  @Property()
  public name: string;

  @Field(() => PublisherType)
  @Enum(() => PublisherType)
  public type: PublisherType;

  @Field(() => [Book])
  @OneToMany(() => Book, (b: Book) => b.publisher)
  public books = new Collection<Book>(this);

  constructor(props: { name: string, type: PublisherType}) {
    super(props);
    this.name = props.name;
    this.type = props.type;
  }
}
