import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { GraphQLModule } from '@nestjs/graphql';
import { BookmarksResolver } from './resolvers/bookmarks.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
    }),
  ],
  providers: [BookmarksService, BookmarksResolver],
  exports: [BookmarksService],
})
export class BookmarksModule {}
