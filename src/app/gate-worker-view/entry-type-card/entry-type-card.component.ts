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

    isShowVehicleTypeEnabled: boolean = false;



    constructor() { }

    ngOnInit() {
        console.log(this.vehicleTypes)
    }

    showVehicleType() {
        this.isShowVehicleTypeEnabled = !this.isShowVehicleTypeEnabled;
    }
}
