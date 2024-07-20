import { Cascade, Collection, Entity, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/postgresql';
import { Field, ObjectType } from 'type-graphql';
import { Base } from 'utils/entities/base.entity';
import { Book } from './book.entity';

@ObjectType()
@Entity()
export class Author extends Base {
  @Field()
  @Property()
  public name: string;

  @Field()
  @Property()
  @Unique()
  public email: string;

  @Property()
  public termsAccepted = false;

  @Field({ nullable: true })
  @Property({ nullable: true })
  public born?: Date;

  @Field(() => [Book])
  @OneToMany(() => Book, (b: Book) => b.author, { cascade: [Cascade.ALL] })
  public books = new Collection<Book>(this);

  @Field(() => Book, { nullable: true })
  @ManyToOne(() => Book, { nullable: true })
  public favouriteBook?: Book;

  constructor(props: { name: string, email: string, born?: Date }) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.born = props.born;
  }
}
