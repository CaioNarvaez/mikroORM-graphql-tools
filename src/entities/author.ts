import { Cascade, Collection, Embedded, Entity, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/postgresql';
import { CalendarDate } from 'calendar-date';
import { Book } from './book';
import { AbstractBaseEntity } from './abstractBaseEntity';
import { CustomAuthorRepository } from '../repositories';
import { Social } from './embeddables';
import { CalendarDateType } from '../customTypes';

@Entity({ repository: () => CustomAuthorRepository })
export class Author extends AbstractBaseEntity {
  @Property()
  public name: string;

  @Property()
  @Unique()
  public email: string;

  @Property()
  public termsAccepted = false;

  @Property({ nullable: true, type: CalendarDateType })
  public born?: CalendarDate;

  @OneToMany(() => Book, (b: Book) => b.author, { cascade: [Cascade.ALL] })
  public books = new Collection<Book>(this);

  @ManyToOne(() => Book, { nullable: true })
  public favouriteBook?: Book;

  @Embedded(() => Social, { object: true })
  public social?: Social = new Social();

  constructor(props: { name: string, email: string, born?: CalendarDate }) {
    super();
    this.name = props.name;
    this.email = props.email;
    this.born = props.born;
  }
}
