import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as BookmarksUiActions from './bookmarks-ui.actions';
import { BookmarksService } from '../../bookmarks.service';

@Injectable()
export class BookmarksUiEffects {
  init$ = createEffect(() => this.actions$.pipe(
    ofType(BookmarksUiActions.init),
    switchMap(() => this.bookmarksService.fetchBookmarks().pipe(
      map(res => BookmarksUiActions.fetchBookmarksSuccess({ bookmarksUi: res })),
      catchError(error => {
        this.snackBar.open(`Something went wrong. Can't load bookmarks.`, null, {duration: 2000});
        return of(BookmarksUiActions.fetchBookmarksFailure({ error }));
      }),
    )),
  ));

  createBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(BookmarksUiActions.createBookmark),
    switchMap(({bookmark}) => this.bookmarksService.createBookmark(bookmark).pipe(
      map(res => BookmarksUiActions.addBookmark({ bookmark: res })),
      catchError(error => {
        this.snackBar.open('Bookmark was not created', null, {duration: 2000});
        return of(BookmarksUiActions.createBookmarkFailure({ error }))
      }),
    )),
  ));

  fetchBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(BookmarksUiActions.fetchBookmark),
    switchMap(({id}) => this.bookmarksService.fetchBookmark(id).pipe(
      map(res => BookmarksUiActions.addBookmark({ bookmark: res })),
      catchError(error => {
        this.snackBar.open('Bookmark does not exist', null, {duration: 2000});
        return of(BookmarksUiActions.fetchBookmarkFailure({ error }))
      }),
    )),
  ));

  removeBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(BookmarksUiActions.removeBookmark),
    switchMap(({id}) => this.bookmarksService.removeBookmark(id).pipe(
      map(() => BookmarksUiActions.bookmarkRemoved({ id })),
      catchError(error => {
        this.snackBar.open('Something went wrong =(', null, {duration: 2000});
        return of(BookmarksUiActions.bookmarkRemoveFailure({ error }));
      }),
    )),
  ));

  constructor(
    private actions$: Actions,
    private bookmarksService: BookmarksService,
    private snackBar: MatSnackBar,
  ) {}
}
