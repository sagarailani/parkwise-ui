import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPremiseManagerFormComponent } from './new-premise-manager-form.component';

describe('NewPremiseManagerFormComponent', () => {
  let component: NewPremiseManagerFormComponent;
  let fixture: ComponentFixture<NewPremiseManagerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPremiseManagerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPremiseManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
