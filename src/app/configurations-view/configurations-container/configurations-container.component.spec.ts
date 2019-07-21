import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsContainerComponent } from './configurations-container.component';

describe('ConfigurationsContainerComponent', () => {
  let component: ConfigurationsContainerComponent;
  let fixture: ComponentFixture<ConfigurationsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
