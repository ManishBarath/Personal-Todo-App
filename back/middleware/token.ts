import jwt from "jsonwebtoken";
import Accounts from "../Accounts";

const SECRET_KEY = 'gafdkjgbadfgsdkjbgsdlkhgjkdrhgbadrlkg';

export function generateToken(user: Accounts) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '10h' });
}

export function verifyToken(token: string) {
  console.log('Verifying token:', token);
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    console.error('Token verification failed:', e);
    return null;
  }
}