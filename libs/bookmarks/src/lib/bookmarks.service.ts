import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Bookmark, CreateBookmarkInput } from './resolvers/model';

const prisma = new PrismaClient();

@Injectable()
export class BookmarksService {
  public async getBookmarks(): Promise<Bookmark[]> {
    return prisma.bookmark.findMany();
  }

  public async getBookmark(id: string): Promise<Bookmark> {
    return prisma.bookmark.findUnique({where: {id}});
  }

  public async createBookmark(data: CreateBookmarkInput): Promise<Bookmark> {
    return prisma.bookmark.create({ data });
  }

  public async removeBookmark(id: string): Promise<Bookmark> {
    return prisma.bookmark.delete({where: {id}});
  }
}
