import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-registered-vehicle',
    templateUrl: './registered-vehicle.component.html',
    styleUrls: ['./registered-vehicle.component.css']
})
export class RegisteredVehicleComponent implements OnInit {

    registerVehicleForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    vehicleTypes: string[] = [
        "2-Wheeler",
        "4-Wheeler",
        "Heavy Vehicle",
        "Bus",
    ]

    validationMessages = {
        'clientUsername': {
            'required': 'Client Username is required',
        },
        'premiseName': {
            'required': 'Premise Name is required',
        },
        'vehicleType': {
            'required': 'Vehicle Type is required',
        },
        'vehicleNumber': {
            'required': 'Vehicle Number is required',
        },
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'vehicleType': '',
        'vehicleNumber': '',
    }


    constructor(private fb: FormBuilder, private clientPremiseService
        : ClientPremiseService) { }

    ngOnInit() {
        this.registerVehicleForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            vehicleType: ['', Validators.required],
            vehicleNumber: ['', Validators.required],
        })
        console.log(this.clients);

        this.getClients();
        this.registerVehicleForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
        });

        this.registerVehicleForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

    saveRegisteredVehicleData() {

    }

    logValidationErrors(group: FormGroup = this.registerVehicleForm) {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl)
            } else {
                if (abstractControl && abstractControl.invalid && (
                    abstractControl.touched || abstractControl.dirty
                )) {
                    this.formErrors[key] = ""
                    const messages = this.validationMessages[key];
                    console.log(key + " : " + messages)
                    for (const error in abstractControl.errors) {
                        if (error) {
                            this.formErrors[key] += messages[error];
                        }
                    }
                } else {
                    this.formErrors[key] = "";
                }
            }
        })
    }

}
