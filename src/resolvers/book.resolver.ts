import { Author } from 'entities/author.entity';
import { Book } from 'entities/book.entity';
import { Publisher } from 'entities/publisher.entity';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from 'utils/interfaces/context.interface';

@Resolver(() => Book)
export class BookResolver {
  @Query(() => [Book])
  public async getBooks(@Ctx() ctx: MyContext): Promise<Book[]> {
    return ctx.em.getRepository(Book).findAll();
  }

  @Query(() => Book, { nullable: true })
  public async getBook(
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
  ): Promise<Book | null> {
    return ctx.em.getRepository(Book).findOne({ id });
  }

  @Mutation(() => Book)
  public async addBook(
    @Arg('input') input: { title: string },
    @Arg('authorId') authorId: string,
    @Arg('publisherId', { nullable: true }) publisherId: string,
    @Ctx() ctx: MyContext,
  ): Promise<Book> {
    const author = await ctx.em
      .getRepository(Author)
      .findOneOrFail({ id: authorId });

    const book = new Book({
      author,
      title: input.title
    });

    if (publisherId) {
      book.publisher = await ctx.em.getRepository(Publisher).findOneOrFail(
        { id: publisherId },
      );
    }
    await ctx.em.persist(book).flush();
    return book;
  }

  @Mutation(() => Book)
  public async updateBook(
    @Arg('input') input: { title: string },
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
  ): Promise<Book> {
    const book = await ctx.em.getRepository(Book).findOneOrFail({ id });
    const { title } = input;
    book.title = title;
    await ctx.em.persist(book).flush();
    return book;
  }

  @Mutation(() => Boolean)
  public async deleteBook(@Arg('id') id: string, @Ctx() ctx: MyContext): Promise<boolean> {
    const book = await ctx.em.getRepository(Book).findOneOrFail({ id });
    await ctx.em.removeAndFlush(book);
    return true;
  }
}
