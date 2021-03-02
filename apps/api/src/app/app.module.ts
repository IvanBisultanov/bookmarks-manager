import { Module } from '@nestjs/common';
import { BookmarksModule } from '@bookmarks/bookmarks';

@Module({
  imports: [BookmarksModule],
})
export class AppModule {}
