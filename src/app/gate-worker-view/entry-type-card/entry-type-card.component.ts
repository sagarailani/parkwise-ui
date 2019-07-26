import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-entry-type-card',
    templateUrl: './entry-type-card.component.html',
    styleUrls: ['./entry-type-card.component.css'],
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

export class EntryTypeCardComponent implements OnInit {

    @Input() entryName: string;
    @Input() vehicleTypes: {}[];
    @Input() premiseId;
    @Input() clientId;
    @Input() gateId;
    @Input() workerId;
    @Input() tempConfigId;

    isShowVehicleTypeEnabled: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    showVehicleType() {
        this.isShowVehicleTypeEnabled = !this.isShowVehicleTypeEnabled;
        // console.log("entryname " + this.entryName)
        // console.log("premise id " + this.premiseId)
        // console.log("client id " + this.clientId)
        // console.log("gateid " + this.gateId)
        // console.log("worker id " + this.workerId)
    }
}
