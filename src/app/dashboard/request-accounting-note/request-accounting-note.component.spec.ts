import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccountingNoteComponent } from './request-accounting-note.component';

describe('RequestAccountingNoteComponent', () => {
  let component: RequestAccountingNoteComponent;
  let fixture: ComponentFixture<RequestAccountingNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAccountingNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAccountingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
