import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsViewComponent } from './configurations-view.component';

describe('ConfigurationsViewComponent', () => {
  let component: ConfigurationsViewComponent;
  let fixture: ComponentFixture<ConfigurationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
