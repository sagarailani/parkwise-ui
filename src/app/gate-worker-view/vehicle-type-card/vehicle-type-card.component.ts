import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { GateWorkerViewModule } from '../gate-worker-view.module';
@Component({
    selector: 'app-vehicle-type-card',
    templateUrl: './vehicle-type-card.component.html',
    styleUrls: ['./vehicle-type-card.component.css'],
    animations: [
        trigger('slideUpDown', [
            transition(':enter', [
                style({ height: '0em' }),
                animate('200ms ease-in', style({ height: '4em' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ height: '0em' }))
            ])
        ])
    ]
})
export class VehicleTypeCardComponent implements OnInit {

    @Input() type: string;
    @Input() valetAvailable: boolean;
    @Input() slots;
    @Input() configId;
    @Input() clientId;
    @Input() premiseId;
    @Input() workerId;
    @Input() gateId;

    isShowForm: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    showForm() {
        this.isShowForm = !this.isShowForm;
    }
}
