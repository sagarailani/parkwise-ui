import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GateService } from '../gate.service';
import { UserService } from '../user.service';
import { PremiseService } from '../premise.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-gate-form',
    templateUrl: './gate-form.component.html',
    styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {
    gateConfigForm: FormGroup;
    clients: {};
    premiseForClient: any;
    clientId;
    premiseId;
    role;

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


    constructor(private fb: FormBuilder,
        private _gateService: GateService,
        private _userService: UserService,
        private _premiseService: PremiseService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        this.clientId = this.route.snapshot.paramMap.get('clientId')
        this.premiseId = this.route.snapshot.paramMap.get('premiseId')
        this.role = this.route.snapshot.paramMap.get('role')

        this.gateConfigForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            gateName: ['', Validators.required],
        })

        if (this.role === 'ADMIN') {
            this._userService.getClients()
                .subscribe((clients) => {
                    this.clients = clients;
                })
        }

        if (this.role === 'MANAGER') {
            this._premiseService.getPremises(this.clientId)
                .subscribe(premises => this.premiseForClient = premises)

        }

        this.gateConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientId = clientId;
            this._premiseService.getPremises(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            // console.log(this.premiseForClient)
        });

        this.gateConfigForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })

        this.gateConfigForm.controls.premiseName.valueChanges
            .subscribe((premiseId) => {
                this.premiseId = premiseId
            })
    }

    saveGateConfigData() {
        this._gateService.addGateForPremise(this.premiseId, this.gateConfigForm.controls.gateName.value)
            .subscribe((value) => {
                console.log(value)
            })
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
