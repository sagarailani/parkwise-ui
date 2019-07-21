import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-data-entry-form',
    templateUrl: './data-entry-form.component.html',
    styleUrls: ['./data-entry-form.component.css']
})
export class DataEntryFormComponent implements OnInit {

    dataEntryForm: FormGroup;
    @Input() enableValet: boolean;
    @Input() premiseConfigurationId: number;
    @Input() vehicleType: string;
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.dataEntryForm = this.fb.group({
            vehicleNumber: [''],
            valetOption: [''],
        });
        console.log(this.vehicleType);
    }

    saveVehicleNumber() {
        console.log(this.dataEntryForm.value.vehicleNumber);
        console.log(this.dataEntryForm.value.valetOption);
    }
}
