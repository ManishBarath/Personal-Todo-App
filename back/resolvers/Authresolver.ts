import { Arg, Mutation, Resolver } from "type-graphql";
import Accounts from "../Accounts";
import { generateToken } from "../middleware/token";
import bcrypt from 'bcryptjs';

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const hashpass = await bcrypt.hash(password, 12);
    const user = await Accounts.create({ email, password: hashpass });
    return generateToken(user);
  }

  @Mutation(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<string> {
    const user = await Accounts.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password');
    }
    return generateToken(user);
  }
}
