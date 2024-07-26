import DataLoader from "dataloader";
import { EntityRepository } from "@mikro-orm/postgresql";
import { orm } from "../config/orm";
import { Author } from "../entities";
import { QueryauthorsPaginatedArgs } from "../generated/resolvers-types";
import { getAuthorFilterQuery } from "../paginatedFilters";

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


  // ToDo: refactor and improve this function to more generic and better readable
  async getPaginated(options: Partial<QueryauthorsPaginatedArgs>) {
    const { after, filterBy, first } = options;
    
    const filterQuery = getAuthorFilterQuery(filterBy);
    // ToDo: create generic util for orderBy query
    // const order = orderBy ?? {}; 

    try {
      const results = await this.findByCursor(filterQuery, {
        first,
        after,
        orderBy: [{
          name: 'ASC' // Default
        }],
      });

      // Transform the result into AuthorConnection format
      const items = results.items.map(item => item);
      const hasPreviousPage = results.hasPrevPage;
      const {hasNextPage} = results;
      const {totalCount} = results;
      const {endCursor} = results;
      const {startCursor} = results;

      return {
        items,
        hasPreviousPage,
        hasNextPage,
        totalCount,
        endCursor,
        startCursor,
      };

    } catch (error) {
      console.error('Error fetching paginated results:', error);
      throw new Error('Failed to fetch paginated results');
    }
  }


    async getNumberOfBooksFromAuthorByAuthorId(authorId: string) {
        return this.testDataloader.load(authorId);
    }
}