import { Sequelize } from "sequelize-typescript";
import Todo from "./users";
import Accounts from "./Accounts";
import { Dialect } from "sequelize";

const sequelize = new Sequelize({
  database: 'todo_db',
  dialect: "mysql" as Dialect,
  username: "root",
  password: '',
  host: 'localhost',
  port: 3306,
  models: [Todo, Accounts],
});

sequelize.authenticate().then(() => {
  console.log('Connection to the database established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

export default sequelize;
