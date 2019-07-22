import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-gate-form',
    templateUrl: './gate-form.component.html',
    styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {
    gateConfigForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    validationMessages = {
        'clientUsername': {
            'required': 'Client Username is required',
        },
        'premiseName': {
            'required': 'Premise Name is required',
        },
        'gateName': {
            'required': 'Gate Name is required',
        }
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'gateName': '',
    }


    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.gateConfigForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            gateName: ['', Validators.required],
        })

        console.log(this.clients)

        this.getClients();
        this.gateConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });

        this.gateConfigForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })
    }

    saveGateConfigData() {
        console.log(this.gateConfigForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

    logValidationErrors(group: FormGroup = this.gateConfigForm) {
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
