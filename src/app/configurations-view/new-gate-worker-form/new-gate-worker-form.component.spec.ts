import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGateWorkerFormComponent } from './new-gate-worker-form.component';

describe('NewGateWorkerFormComponent', () => {
  let component: NewGateWorkerFormComponent;
  let fixture: ComponentFixture<NewGateWorkerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGateWorkerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGateWorkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
