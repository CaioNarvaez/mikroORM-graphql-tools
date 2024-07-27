import { faker } from '@faker-js/faker';
import { MikroORM } from '@mikro-orm/postgresql';
import { v4 } from 'uuid';
import { CalendarDate } from 'calendar-date';
import { Author, Book, Publisher, Tag } from '../../entities';
import { PublisherType } from '../../enums';

export const seedDatabase = async (orm: MikroORM): Promise<void> => {
  try {
    // Create 5 tags
    const tags = [...Array(5)].map((_, tagIndex) => {
      const tag = new Tag({
        name: `tag ${tagIndex + 1}`,
      });
      
      orm.em.persist(tag);
      return tag;
    });

    // Create 5 publishers
    const publishers = [...Array(5)].map(() => {
      const publisher = new Publisher({
        name: faker.company.name(),
        type: PublisherType.GLOBAL,
      });

      // setting temporary id for test purposes
      publisher.id = v4();

      orm.em.persist(publisher);
      return publisher;
    });

    // Create 5 authors
    const authors = [...Array(5)].map((_, authorIndex) => {
      const author = new Author({
        name: `author ${authorIndex + 1}`,
        email: faker.internet.email(),
        born: new CalendarDate('1994-01-01')
      });

      // setting temporary id for test purposes
      author.id = v4();

      orm.em.persist(author);
      return author;
    });

    // Create 5 books
    [...Array(5)].map((_, bookIndex) => {
      const book = new Book({
        title: `title ${bookIndex + 1}`,
        author: authors[bookIndex]
      });

      // setting temporary id for test purposes
      book.id = v4();
      book.tags.add(tags[bookIndex]);
      book.publisher = publishers[bookIndex];

      orm.em.persist(book);
      return book;
    });

    await orm.em.flush();
  } catch (error) {
    console.error('📌 Could not seed database', error);
  }
};
