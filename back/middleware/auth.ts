import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";
import { MyContext } from "../graphql/types/context";
import { verifyToken } from "./token";
import Accounts from "../Accounts";

export class AuthMid implements MiddlewareInterface<MyContext> {
  async use({ context }: ResolverData<MyContext>, next: NextFn) {
    const authHeader = context.req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    try {
      const user = verifyToken(token);
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }
      context.req.user = user as Accounts; 
    } catch (err) {
      throw new AuthenticationError("Not authenticated");
    }

    return next();
  }
}