import { Request, Response } from 'express';
import Accounts from '../../Accounts';

export interface MyContext {
  req: Request & { user?: Accounts };
}
