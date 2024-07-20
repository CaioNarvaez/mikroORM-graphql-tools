import { Author } from 'entities/author.entity';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from 'utils/interfaces/context.interface';

@Resolver(() => Author)
export class AuthorResolver {
  @Query(() => [Author])
  public async getAuthors(@Ctx() ctx: MyContext): Promise<Author[]> {
    return ctx.em.getRepository(Author).findAll();
  }

  @Query(() => Author, { nullable: true })
  public async getAuthor(
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
  ): Promise<Author | null> {
    return ctx.em.getRepository(Author).findOne({ id });
  }

  @Mutation(() => Author)
  public async addAuthor(@Arg('input') input: { name: string, email: string, born?: Date}, @Ctx() ctx: MyContext): Promise<Author> {
    const author = new Author(input);
    await ctx.em.persist(author).flush();
    return author;
  }

  @Mutation(() => Author)
  public async updateAuthor(
    @Arg('input') input: { name: string, email: string, born?: Date },
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
  ): Promise<Author> {
    const author = await ctx.em.getRepository(Author).findOneOrFail({ id });
    const { name, email, born } = input;
    author.born = born;
    author.name = name;
    author.email = email;
    await ctx.em.persist(author).flush();
    return author;
  }

  @Mutation(() => Boolean)
  public async deleteAuthor(@Arg('id') id: string, @Ctx() ctx: MyContext): Promise<boolean> {
    const author = await ctx.em.getRepository(Author).findOneOrFail({ id });
    await ctx.em.removeAndFlush(author);
    return true;
  }
}
