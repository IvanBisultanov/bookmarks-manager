import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Bookmark } from '@prisma/client';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { uniq } from 'lodash-es';

import * as BookmarksUiActions from '../+state/bookmarks/bookmarks-ui.actions';
import * as BookmarksUiSelectors from '../+state/bookmarks/bookmarks-ui.selectors';
import { DialogAddBookmarkComponent, DialogAddBookmarkData } from './dialog-add-bookmark/dialog-add-bookmark.component';

@Component({
  selector: 'bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.scss']
})
export class BookmarksListComponent implements OnInit, OnDestroy {
  bookmarks$: Observable<Bookmark[]>;
  bookmarksLoaded$: Observable<boolean>;
  private createBookmark$: Subscription;

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private store: Store,
  ) {}

  ngOnDestroy() {
    this.createBookmark$?.unsubscribe()
  }

  ngOnInit(): void {
    this.bookmarksLoaded$ = this.store.pipe(select(BookmarksUiSelectors.getBookmarksUiLoaded));
    this.bookmarks$ = this.store.pipe(select(BookmarksUiSelectors.getAllBookmarksUi));
    this.bookmarksLoaded$.pipe(
      tap((isLoaded) => {
        if (!isLoaded) {
          this.store.dispatch(BookmarksUiActions.init());
        }
      }),
      take(1),
    ).subscribe();
  }

  addBookmark() {
    this.bookmarks$.pipe(take(1)).subscribe(bookmarks => {
      const dialogRef = this.dialog.open<DialogAddBookmarkComponent, DialogAddBookmarkData>(DialogAddBookmarkComponent, {
        width: '280px',
        data: {
          groups: uniq(bookmarks.map(i => i.group.toLowerCase())),
          create: data => {
            this.store.dispatch(BookmarksUiActions.createBookmark({bookmark: data}));
            this.createBookmark$ = this.actions$
              .pipe(ofType(BookmarksUiActions.addBookmark, BookmarksUiActions.createBookmarkFailure))
              .subscribe(() => dialogRef.close());
          },
        },
      });
    });
  }
}
