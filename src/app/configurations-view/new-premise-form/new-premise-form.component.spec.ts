import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPremiseFormComponent } from './new-premise-form.component';

describe('NewPremiseFormComponent', () => {
  let component: NewPremiseFormComponent;
  let fixture: ComponentFixture<NewPremiseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPremiseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPremiseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
