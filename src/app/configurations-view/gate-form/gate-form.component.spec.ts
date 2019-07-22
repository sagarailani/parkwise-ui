import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateFormComponent } from './gate-form.component';

describe('GateFormComponent', () => {
  let component: GateFormComponent;
  let fixture: ComponentFixture<GateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
