import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';


@Component({
    selector: 'app-data-entry-form',
    templateUrl: './data-entry-form.component.html',
    styleUrls: ['./data-entry-form.component.css']
})
export class DataEntryFormComponent implements OnInit {

    dataEntryForm: FormGroup;
    @Input() premiseId;
    @Input() type;
    @Input() clientId;
    @Input() gateId;
    @Input() workerId;
    @Input() enableValet: boolean;
    @Input() configId;
    @Input() vehicleType: string;

    constructor(
        private fb: FormBuilder,
        private _vehicleService: VehicleService,
    ) { }

    ngOnInit() {
        this.dataEntryForm = this.fb.group({
            vehicleNumber: ['', Validators.required],
            valetOption: [false],
        });
        console.log(this.vehicleType);
    }

    saveVehicleNumber() {
        console.log('client id: ' + this.clientId)
        console.log('premise id: ' + this.premiseId)
        console.log('gate id: ' + this.gateId)
        console.log('worker id: ' + this.workerId)
        console.log('config id: ' + this.configId)

        if (this.type === 'EXIT') {
            this._vehicleService.makeExit(
                this.premiseId,
                this.gateId,
                this.dataEntryForm.controls.vehicleNumber.value,
            ).subscribe((value) => {
                console.log(value)
                alert("Exit log successful")
            })
        } else {
            this._vehicleService.makeEntry(
                this.dataEntryForm.controls.vehicleNumber.value,
                this.dataEntryForm.controls.valetOption.value,
                this.workerId,
                this.premiseId,
                this.configId,
                this.gateId
            ).subscribe((value) => {
                console.log(value)
                alert('Collect Rs ' + value.premiseConfiguration.incrementPricing.baseCost + " from customer")
            })

        }
    }
}
