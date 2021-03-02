import { Routes } from '@angular/router';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { BookmarkDetailsComponent } from './bookmark-details/bookmark-details.component';

export const bookmarkUiRoutes: Routes = [
  {
    path: 'bookmark/:id',
    component: BookmarkDetailsComponent,
  },
  {
    path: '',
    component: BookmarksListComponent,
  },
];
