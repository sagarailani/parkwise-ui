import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTypeCardComponent } from './entry-type-card.component';

describe('EntryTypeCardComponent', () => {
  let component: EntryTypeCardComponent;
  let fixture: ComponentFixture<EntryTypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryTypeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
