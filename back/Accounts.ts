import { Model, Column, DataType, Table, CreatedAt, UpdatedAt, ForeignKey, AutoIncrement, HasMany, BelongsTo } from 'sequelize-typescript';
import sequelize from './database';
import { Field, Int, ObjectType } from 'type-graphql';
import Todo from './users';

@Table({
    modelName: 'Accounts',
    timestamps: true
  })
  @ObjectType()
  export default class Accounts extends Model {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    })
    @Field(() => Int)
    id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true
    })
    @Field()
    email!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    password!: string;
  
    @HasMany(() => Todo)
    todos!: Todo[];
  }