import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/postgresql';
import { AbstractBaseEntity } from './abstractBaseEntity';
import { Author } from './author';
import { Publisher } from './publisher';
import { Tag } from './tag';

@Entity()
export class Book extends AbstractBaseEntity {
  @Property()
  public title: string;

  @ManyToOne(() => Author, { deleteRule: 'cascade' })
  public author: Author;

  @ManyToOne(() => Publisher, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: true })
  public publisher?: Publisher;

  @ManyToMany(() => Tag)
  public tags = new Collection<Tag>(this);

  constructor(props: { title: string, author: Author }) {
    super();
    this.title = props.title;
    this.author = props.author;
  }
}
