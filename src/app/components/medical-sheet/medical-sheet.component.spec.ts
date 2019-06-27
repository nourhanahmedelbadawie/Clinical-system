import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalSheetComponent } from './medical-sheet.component';

describe('MedicalSheetComponent', () => {
  let component: MedicalSheetComponent;
  let fixture: ComponentFixture<MedicalSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
