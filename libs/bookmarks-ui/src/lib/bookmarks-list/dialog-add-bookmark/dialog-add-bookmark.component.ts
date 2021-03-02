import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Bookmark } from '@prisma/client';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as BookmarksUiSelectors from '../../+state/bookmarks/bookmarks-ui.selectors';

export interface DialogAddBookmarkData {
  groups: string[];
  create: (data: {
    name: string;
    url: string;
    group: string;
  }) => void;
}

@Component({
  templateUrl: './dialog-add-bookmark.component.html',
  styleUrls: ['./dialog-add-bookmark.component.scss']
})
export class DialogAddBookmarkComponent implements OnInit {
  bookmarks$: Observable<Bookmark[]>;
  model = this.fb.group({
    name: null,
    url: null,
    group: null,
  });
  urlPattern = /^\s*(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?\s*$/;
  httpPattern = /http[s]?:\/\/.+/;
  filteredOptions: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogAddBookmarkData,
    private fb: FormBuilder,
    private store: Store,
    ) {}

  ngOnInit(): void {
    this.filteredOptions = this.model.get('group').valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value)),
    );
    this.bookmarks$ = this.store.pipe(select(BookmarksUiSelectors.getAllBookmarksUi));
  }

  create() {
    const formValue = this.model.value;
    formValue.url = this.correctUrl(formValue.url);
    this.data.create(formValue);
  }

  private correctUrl(url) {
    return url && !this.httpPattern.test(url) ? `http://${url}` : url;
  }

  private filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.data.groups.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
