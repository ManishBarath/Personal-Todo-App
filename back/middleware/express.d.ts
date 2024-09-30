import Accounts from "../Accounts";

declare global {
    namespace Express {
      interface Request {
        user?: Accounts;
      }
    }
  }