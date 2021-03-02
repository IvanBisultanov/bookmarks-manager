import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Bookmark {
  @Field() id: string;
  @Field() name: string;
  @Field() url: string;
  @Field() group: string;
  @Field() createdAt: Date;
}

@InputType()
export class CreateBookmarkInput {
  @Field() name: string;
  @Field() url: string;
  @Field() group: string;
}
