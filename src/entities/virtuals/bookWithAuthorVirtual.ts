import { Entity, EntityManager, Property } from "@mikro-orm/postgresql";
import { Book } from "../book";

@Entity({
    expression: (em: EntityManager) => {
      return em.createQueryBuilder(Book, 'b')
        .select(['b.title', 'a.name as author_name'])
        .join('b.author', 'a')

    },
  })
  export class BookWithAuthorVirtual {
  
    @Property()
    title!: string;
  
    @Property()
    authorName!: string;
  
  }