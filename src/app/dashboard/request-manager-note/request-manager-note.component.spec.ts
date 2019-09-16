import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestManagerNoteComponent } from './request-manager-note.component';

describe('RequestManagerNoteComponent', () => {
  let component: RequestManagerNoteComponent;
  let fixture: ComponentFixture<RequestManagerNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestManagerNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestManagerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
