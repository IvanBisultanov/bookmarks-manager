import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookmarksService } from '../bookmarks.service';
import { Bookmark, CreateBookmarkInput } from './model';

@Resolver(() => Bookmark)
export class BookmarksResolver {
  constructor(private bookmarksService: BookmarksService) {}

  @Query(() => [Bookmark])
  bookmarks(): Promise<Bookmark[]> {
    return this.bookmarksService.getBookmarks();
  }

  @Query(() => Bookmark)
  exactBookmark(@Args({name: 'id'}) id: string): Promise<Bookmark> {
    return this.bookmarksService.getBookmark(id);
  }

  @Query(() => Bookmark)
  removeBookmark(@Args({name: 'id'}) id: string): Promise<Bookmark> {
    return this.bookmarksService.removeBookmark(id);
  }

  @Mutation(() => Bookmark)
  bookmark(@Args({name: 'input'}) input: CreateBookmarkInput): Promise<Bookmark> {
    return this.bookmarksService.createBookmark(input);
  }
}
