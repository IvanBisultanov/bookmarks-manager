import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BOOKMARKS_UI_FEATURE_KEY,
  State,
  BookmarksUiPartialState,
  bookmarksUiAdapter,
} from './bookmarks-ui.reducer';

export const getBookmarksUiState = createFeatureSelector<
  BookmarksUiPartialState,
  State
>(BOOKMARKS_UI_FEATURE_KEY);

const { selectAll, selectEntities } = bookmarksUiAdapter.getSelectors();

export const getBookmarksUiLoaded = createSelector(
  getBookmarksUiState,
  (state: State) => state.loaded
);

export const getBookmarksUiError = createSelector(
  getBookmarksUiState,
  (state: State) => state.error
);

export const getAllBookmarksUi = createSelector(
  getBookmarksUiState,
  (state: State) => selectAll(state)
);

export const getBookmarksUiEntities = createSelector(
  getBookmarksUiState,
  (state: State) => selectEntities(state)
);
