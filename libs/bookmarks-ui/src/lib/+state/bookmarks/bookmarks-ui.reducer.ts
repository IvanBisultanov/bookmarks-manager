import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BookmarksUiActions from './bookmarks-ui.actions';
import { Bookmark } from '@prisma/client';


export const BOOKMARKS_UI_FEATURE_KEY = 'bookmarksUi';

export interface State extends EntityState<Bookmark> {
  loaded: boolean; // has the Bookmarks list been loaded
  error?: string | null; // last known error (if any)
}

export interface BookmarksUiPartialState {
  readonly [BOOKMARKS_UI_FEATURE_KEY]: State;
}

export const bookmarksUiAdapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>();

export const initialState: State = bookmarksUiAdapter.getInitialState({
  loaded: false,
});

const bookmarksUiReducer = createReducer(
  initialState,
  on(BookmarksUiActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BookmarksUiActions.fetchBookmarksSuccess, (state, { bookmarksUi }) =>
    bookmarksUiAdapter.setAll(bookmarksUi, { ...state, loaded: true })
  ),
  on(BookmarksUiActions.fetchBookmarksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BookmarksUiActions.addBookmark, (state, { bookmark }) =>
    bookmarksUiAdapter.setOne(bookmark, { ...state })
  ),
  on(BookmarksUiActions.bookmarkRemoved, (state, { id }) =>
    bookmarksUiAdapter.removeOne(id, { ...state })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return bookmarksUiReducer(state, action);
}
