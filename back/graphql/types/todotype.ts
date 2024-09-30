import { InputType, Field } from 'type-graphql';
import { MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field()
  @IsNotEmpty()
  id!: number;

  @Field({ nullable: true })
  @MaxLength(25)
  @IsOptional()
  Title?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsOptional()
  Description?: string;

  @Field({ nullable: true })
  @IsOptional()
  Status?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  Due?: string;
}

@InputType()
export class NewTodoInput {
  @Field()
  @MaxLength(25)
  Title!: string;

  @Field()
  @MaxLength(255)
  Description!: string;

  @Field({ nullable: true })
  @IsOptional()
  Status?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  Due?: string;
}
