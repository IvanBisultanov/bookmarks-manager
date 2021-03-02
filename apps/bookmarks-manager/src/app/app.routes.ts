import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('libs/bookmarks-ui/src').then(m => m.BookmarksUiModule),
  },
];
