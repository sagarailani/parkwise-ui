import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-generate-pass-form',
    templateUrl: './generate-pass-form.component.html',
    styleUrls: ['./generate-pass-form.component.css']
})
export class GeneratePassFormComponent implements OnInit {
    generatePassForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

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
        'passType': {
            'required': 'Pass Type is required',
        },
        'vehicleNumber': {
            'required': 'Vehicle Number is required',
        },
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'vehicleType': '',
        'passType': '',
        'vehicleNumber': '',
    }


    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.generatePassForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            vehicleType: ['', Validators.required],
            passType: ['', Validators.required],
            vehicleNumber: ['', Validators.required],
        })

        console.log(this.clients)

        this.getClients();
        this.generatePassForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });

        this.generatePassForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })

    }

    savePassData() {
        console.log(this.generatePassForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

    logValidationErrors(group: FormGroup = this.generatePassForm) {
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
