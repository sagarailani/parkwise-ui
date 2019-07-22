import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePricingConfigurationFormComponent } from './update-pricing-configuration-form.component';

describe('UpdatePricingConfigurationFormComponent', () => {
  let component: UpdatePricingConfigurationFormComponent;
  let fixture: ComponentFixture<UpdatePricingConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePricingConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePricingConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
