import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '@bookmarks/material';

import * as fromBookmarksUi from './+state/bookmarks/bookmarks-ui.reducer';
import { BookmarksUiEffects } from './+state/bookmarks/bookmarks-ui.effects';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { DialogAddBookmarkComponent } from './bookmarks-list/dialog-add-bookmark/dialog-add-bookmark.component';
import { BookmarkDetailsComponent } from './bookmark-details/bookmark-details.component';
import { bookmarkUiRoutes } from './bookmarks-ui.routes';
import { GroupByPipe } from './pipes/group-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(bookmarkUiRoutes),
    StoreModule.forFeature(
      fromBookmarksUi.BOOKMARKS_UI_FEATURE_KEY,
      fromBookmarksUi.reducer
    ),
    EffectsModule.forFeature([BookmarksUiEffects]),
    MaterialModule,
  ],
  declarations: [
    BookmarkDetailsComponent,
    DialogAddBookmarkComponent,
    BookmarksListComponent,
    GroupByPipe,
  ],
  providers: [
    GroupByPipe,
  ],
  exports: [
    BookmarksListComponent,
    GroupByPipe,
  ],
})
export class BookmarksUiModule {}
