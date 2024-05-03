// src/books/entities/book.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  author: string;

  @Field(() => String, { nullable: true })
  isbn?: string;
}
