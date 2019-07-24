import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassConfigFormComponent } from './pass-config-form.component';

describe('PassConfigFormComponent', () => {
  let component: PassConfigFormComponent;
  let fixture: ComponentFixture<PassConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassConfigFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
