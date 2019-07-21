import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientFormComponent } from './new-client-form.component';

describe('NewClientFormComponent', () => {
    let component: NewClientFormComponent;
    let fixture: ComponentFixture<NewClientFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewClientFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewClientFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
