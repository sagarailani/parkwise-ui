import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePremiseConfigurationFormComponent } from './update-premise-configuration-form.component';

describe('UpdatePremiseConfigurationFormComponent', () => {
  let component: UpdatePremiseConfigurationFormComponent;
  let fixture: ComponentFixture<UpdatePremiseConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePremiseConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePremiseConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
