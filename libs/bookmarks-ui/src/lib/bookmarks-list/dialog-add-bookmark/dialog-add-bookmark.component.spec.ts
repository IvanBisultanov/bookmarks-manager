import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddBookmarkComponent } from './bookmarks-list.component';

describe('BookmarksListComponent', () => {
  let component: DialogAddBookmarkComponent;
  let fixture: ComponentFixture<DialogAddBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
