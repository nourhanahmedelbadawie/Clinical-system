import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendardetailComponent } from './calendardetail.component';

describe('CalendardetailComponent', () => {
  let component: CalendardetailComponent;
  let fixture: ComponentFixture<CalendardetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendardetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendardetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
