import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsCardComponent } from './configurations-card.component';

describe('ConfigurationsCardComponent', () => {
  let component: ConfigurationsCardComponent;
  let fixture: ComponentFixture<ConfigurationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
