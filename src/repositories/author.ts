import DataLoader from "dataloader";
import { EntityRepository } from "@mikro-orm/postgresql";
import { orm } from "../config/orm";
import { Author } from "../entities";
import { QueryauthorsPaginatedArgs } from "../generated/resolvers-types";
import { getAuthorFilter, getAuthorOrderBy } from "../paginatedFilters";

export class CustomAuthorRepository extends EntityRepository<Author> {

    private testDataloader = new DataLoader<string, number>(
        async(authorIds) => {
            const books = await orm.bookRepository.find({
                author: {
                    id: { $in: [...authorIds]}
                }
            }, { fields: ['author.id']});


            const numberOfBooksForAuthorMap = new Map<string, number>(); // <authorId, numberOfBooks>
            for(const book of books) {
                let number = numberOfBooksForAuthorMap.get(book.author.id) ?? 0;
                number++;
                numberOfBooksForAuthorMap.set(book.author.id, number);
            }

            return authorIds.map(id => numberOfBooksForAuthorMap.get(id) || new Error(`No result for ${id}`));
        },
        { cache: false }
    );


  async getPaginated(options: QueryauthorsPaginatedArgs) {
    const { after, filterBy, first, orderBy } = options;
    const filterQuery = getAuthorFilter(filterBy);
    const orderByQuery = getAuthorOrderBy([...orderBy ?? []]);
    try {
      const results = await this.findByCursor(filterQuery, {
        first,
        after,
        orderBy: orderByQuery,
      });
      return results;
    } catch (error) {
      console.error('Error fetching paginated results:', error);
      throw new Error('Failed to fetch paginated results');
    }
  }

  async getNumberOfBooksFromAuthorByAuthorId(authorId: string) {
    return this.testDataloader.load(authorId);
  }
}