import { Model, Column, DataType, Table, CreatedAt, UpdatedAt, ForeignKey, AutoIncrement, HasMany, BelongsTo } from 'sequelize-typescript';
import { Field, Int, ObjectType } from 'type-graphql';
import Accounts from './Accounts';


@Table({
  modelName: "Todo",
  timestamps: true
})
@ObjectType()
export default class Todo extends Model {
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
    allowNull: false
  })
  @Field()
  Title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  @Field()
  Description!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false
  })
  @Field()
  Status!: boolean;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  @Field()
  Due!: string;

  @ForeignKey(() => Accounts)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @Field(() => Int)
  userId!: number;

  @BelongsTo(() => Accounts)
  account!: Accounts;
}