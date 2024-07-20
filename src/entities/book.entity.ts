import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/postgresql';
import { Author } from 'entities/author.entity';
import { Publisher } from 'entities/publisher.entity';
import { Tag } from 'entities/tag.entity';
import { Field, ObjectType } from 'type-graphql';
import { Base } from 'utils/entities/base.entity';

@ObjectType()
@Entity()
export class Book extends Base {
  @Field()
  @Property()
  public title: string;

  @Field(() => Author)
  @ManyToOne(() => Author, { deleteRule: 'cascade' })
  public author: Author;

  @Field(() => Publisher, { nullable: true })
  @ManyToOne(() => Publisher, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: true })
  public publisher?: Publisher;

  @Field(() => [Tag])
  @ManyToMany(() => Tag)
  public tags = new Collection<Tag>(this);

  constructor(props: { title: string, author: Author }) {
    super(props);
    this.title = props.title;
    this.author = props.author;
  }
}
