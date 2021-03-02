import { createAction, props } from '@ngrx/store';
import { Bookmark } from '@prisma/client';

export const init = createAction('[BookmarksUi Page] Init');

export const fetchBookmark = createAction(
  '[BookmarksUi Page] Fetch Bookmark',
  props<{ id: string }>(),
);

export const fetchBookmarkFailure = createAction(
  '[BookmarksUi Page] Fetch Bookmark failure',
  props<{ error: any }>(),
);

export const removeBookmark = createAction(
  '[BookmarksUi Page] Remove Bookmark',
  props<{ id: string }>(),
);

export const fetchBookmarksSuccess = createAction(
  '[BookmarksUi/API] Fetch Bookmarks Success',
  props<{ bookmarksUi: Bookmark[] }>(),
);

export const fetchBookmarksFailure = createAction(
  '[BookmarksUi/API] Fetch Bookmarks Failure',
  props<{ error: any }>(),
);

export const createBookmark = createAction(
  '[BookmarksUi/API] Create Bookmark',
  props<{
    bookmark: {
      name: string;
      url: string;
      group: string;
    };
  }>(),
);

export const addBookmark = createAction(
  '[BookmarksUi/API] Add Bookmark Success',
  props<{ bookmark: Bookmark }>(),
);

export const createBookmarkFailure = createAction(
  '[BookmarksUi/API] Create Bookmark Failure',
  props<{ error: any }>(),
);

export const bookmarkRemoved = createAction(
  '[BookmarksUi/API] Bookmark Removed',
  props<{ id: string }>(),
);

export const bookmarkRemoveFailure = createAction(
  '[BookmarksUi/API] Bookmark Remove Failure',
  props<{ error: any }>(),
);
