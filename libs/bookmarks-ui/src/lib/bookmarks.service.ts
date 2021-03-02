import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Bookmark } from '@prisma/client';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';


const FETCH_BOOKMARKS = gql`
  query {
    bookmarks {
      id
      name
      url
      group
      createdAt
    }
  }
`;

const FETCH_BOOKMARK = gql`
  query ($id: String!) {
    exactBookmark(id: $id) {
      id
      name
      url
      group
      createdAt
    }
  }
`;

const REMOVE_BOOKMARK = gql`
  query ($id: String!) {
    removeBookmark(id: $id) {
      id
    }
  }
`;

const CREATE_BOOKMARK = gql`
  mutation ($data: CreateBookmarkInput!) {
    bookmark(input: $data) {
      id
      name
      url
      group
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  constructor(private apollo: Apollo) {}

  fetchBookmarks(): Observable<Bookmark[]> {
    return this.apollo
      .query({query: FETCH_BOOKMARKS})
      .pipe(pluck('data'), pluck('bookmarks'));
  }

  fetchBookmark(id): Observable<Bookmark> {
    return this.apollo
      .query<Observable<ApolloQueryResult<Bookmark>>>({query: FETCH_BOOKMARK, variables: {id}})
      .pipe(pluck('data'), pluck('exactBookmark'));
  }

  createBookmark(data: {
    name: string;
    url: string;
    group: string;
  }): Observable<Bookmark> {
    return this.apollo
      .mutate({mutation: CREATE_BOOKMARK, variables: {data}})
      .pipe(pluck('data'), pluck('bookmark'))
  }

  removeBookmark(id) {
    return this.apollo
      .query({query: REMOVE_BOOKMARK, variables: {id}});
  }
}
