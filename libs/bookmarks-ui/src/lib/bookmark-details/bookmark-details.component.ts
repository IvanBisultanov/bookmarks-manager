import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Bookmark } from '@prisma/client';
import { Observable, Subscription } from 'rxjs';
import { filter, pluck, take, tap } from 'rxjs/operators';

import * as BookmarksUiActions from '../+state/bookmarks/bookmarks-ui.actions';
import * as BookmarksUiSelectors from '../+state/bookmarks/bookmarks-ui.selectors';

@Component({
  selector: 'bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss']
})
export class BookmarkDetailsComponent implements OnInit, OnDestroy {
  bookmark$: Observable<Bookmark>;
  private removeBookMark$: Subscription;
  private fetchBookmarkFailure$: Subscription;

  constructor(
    private actions$: Actions,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}

  ngOnDestroy() {
    this.removeBookMark$?.unsubscribe();
    this.fetchBookmarkFailure$?.unsubscribe();
  }

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      take(1),
      pluck('id'),
    ).subscribe(id => {
      this.fetchBookmarkFailure$ = this.actions$
        .pipe(ofType(BookmarksUiActions.fetchBookmarkFailure))
        .subscribe(() => this.router.navigate(['/']));
      this.bookmark$ = this.store.pipe(
        select(BookmarksUiSelectors.getBookmarksUiEntities),
        pluck(id),
        tap(bookmark => {
          if (!bookmark) {
            this.store.dispatch(BookmarksUiActions.fetchBookmark({id}));
          }
        }),
        filter(res => !!res),
        take(1),
      );
    });
  }

  remove(id: string) {
    this.store.dispatch(BookmarksUiActions.removeBookmark({id}));
    this.removeBookMark$ = this.actions$
      .pipe(ofType(BookmarksUiActions.bookmarkRemoved))
      .subscribe(() => this.router.navigate(['/']));
  }
}
