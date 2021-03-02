import { Test } from '@nestjs/testing';
import { BookmarksService } from './bookmarks.service';

describe('BookmarksService', () => {
  let service: BookmarksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookmarksService],
    }).compile();

    service = module.get(BookmarksService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
