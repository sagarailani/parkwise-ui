import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateWorkerViewComponent } from './gate-worker-view.component';

describe('GateWorkerViewComponent', () => {
  let component: GateWorkerViewComponent;
  let fixture: ComponentFixture<GateWorkerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateWorkerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateWorkerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
