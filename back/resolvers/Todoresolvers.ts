import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { NewTodoInput, UpdateTodoInput } from "../graphql/types/todotype";
import { sendEmail as sendEmailFunction } from "../mailer";
import { MyContext } from "../graphql/types/context";
import Todo from "../users";
import { AuthMid } from "../middleware/auth";


@Resolver(Todo)
export class TodoResolver {
  @Query(() => [Todo])
  @UseMiddleware(AuthMid)
  async todos(@Ctx() ctx: MyContext): Promise<Todo[]> {
    const userId = ctx.req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return Todo.findAll({ where: { userId } });
  }

  @Mutation(() => Todo, { nullable: true })
 @UseMiddleware(AuthMid)
  async onetodo(
    @Arg("id") id: number,
    @Ctx() ctx: MyContext,

  ): Promise<Todo | null> {
    const userId = ctx.req.user?.id;
    const data = await Todo.findOne({ where: { id, userId } });
    if (data) {
      const text = `Here are the details of the todo item:\n\n` +
        `Title: ${data.Title}\n` +
        `Description: ${data.Description}\n` +
        `Status: ${data.Status ? 'Completed' : 'Pending'}\n` +
        `Due: ${data.Due}`;
      sendEmailFunction(text);
    }
    return data;
  }

  @Mutation(() => Todo)
  @UseMiddleware(AuthMid)
  async addtask(
    @Arg("input") input: NewTodoInput,
    @Ctx() ctx: MyContext
  ): Promise<Todo> {
    const userId = ctx.req.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    const { Title, Description, Due, Status } = input;
    const data = { Title, Description, Due: Due ?? null, Status: Status ?? false, userId };
    return Todo.create(data);
  }

  @Mutation(() => Todo, { nullable: true })
  @UseMiddleware(AuthMid)
  async removetask(
    @Arg("id") id: number,
    @Ctx() ctx: MyContext
  ) {
    const userId = ctx.req.user?.id;
    const data = await Todo.findOne({ where: { id, userId } });
    if (!data) return null;
    await data.destroy();
    return data;
  }

  @Mutation(() => Todo, { nullable: true })
  @UseMiddleware(AuthMid)
  async updatetask(
    @Arg("input") input: UpdateTodoInput,
    @Ctx() ctx: MyContext
  ) {
    const userId = ctx.req.user?.id;
    const { id, Title, Description, Status, Due } = input;
    const data = await Todo.findOne({ where: { id, userId } });
    if (!data) return null;
    if (Title !== undefined) data.Title = Title;
    if (Description !== undefined) data.Description = Description;
    if (Status !== undefined) data.Status = Status;
    if (Due !== undefined) data.Due = Due;
    await data.save();
    return data;
  }
}
