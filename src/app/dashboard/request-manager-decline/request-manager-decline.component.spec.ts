import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestManagerDeclineComponent } from './request-manager-decline.component';

describe('RequestManagerDeclineComponent', () => {
  let component: RequestManagerDeclineComponent;
  let fixture: ComponentFixture<RequestManagerDeclineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestManagerDeclineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestManagerDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
