import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePassFormComponent } from './generate-pass-form.component';

describe('GeneratePassFormComponent', () => {
  let component: GeneratePassFormComponent;
  let fixture: ComponentFixture<GeneratePassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePassFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
