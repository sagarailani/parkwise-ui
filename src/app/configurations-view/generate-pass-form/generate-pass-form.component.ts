import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { PremiseService } from '../premise.service';
import { PremiseConfigService } from '../premise-config.service';
import { PassService } from '../pass.service';

@Component({
    selector: 'app-generate-pass-form',
    templateUrl: './generate-pass-form.component.html',
    styleUrls: ['./generate-pass-form.component.css']
})
export class GeneratePassFormComponent implements OnInit {
    generatePassForm: FormGroup;
    clients: {};
    premiseForClient: {};
    clientId;
    premiseId;
    role;
    premiseConfigs: any;
    passTypes: any;

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

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _userService: UserService,
        private _premiseService: PremiseService,
        private _premiseConfigService: PremiseConfigService,
        private _passService: PassService
    ) { }

    ngOnInit() {

        this.clientId = this.route.snapshot.paramMap.get('clientId')
        this.premiseId = this.route.snapshot.paramMap.get('premiseId')
        this.role = this.route.snapshot.paramMap.get('role')

        this.generatePassForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            vehicleType: ['', Validators.required],
            passType: ['', Validators.required],
            vehicleNumber: ['', Validators.required],
        })

        console.log(this.clients)

        if (this.role === 'ADMIN') {
            this._userService.getClients()
                .subscribe((clients) => {
                    this.clients = clients;
                })
        }

        if (this.role === 'OWNER') {
            this._premiseService.getPremises(this.clientId)
                .subscribe(premises => this.premiseForClient = premises)

        }

        if (this.role === 'MANAGER' || this.role === 'WORKER') {
            this._premiseConfigService.getRegularConfigs(this.premiseId)
            this._premiseConfigService.eventSubject
                .subscribe((configs) => {
                    this.premiseConfigs = configs;
                })
        }

        this.generatePassForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log(clientId)
            this.clientId = clientId;
            this._premiseService.getPremises(clientId)
                .subscribe(premises => this.premiseForClient = premises)
        });

        this.generatePassForm.controls.premiseName.valueChanges.subscribe((premiseId) => {
            this.premiseId = premiseId;
            console.log("Printing premiseId: " + premiseId)
            this._premiseConfigService.getRegularConfigs(premiseId)
            this._premiseConfigService.eventSubject
                .subscribe((configs) => {
                    console.log(configs)
                    this.premiseConfigs = configs;
                })
        })

        this.generatePassForm.controls.vehicleType.valueChanges
            .subscribe((configId) => {
                this._passService.getPassConfigs(
                    this.premiseId,
                    configId
                ).subscribe((passTypes) => {
                    console.log(passTypes)
                    this.passTypes = passTypes;
                })
            })


        this.generatePassForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })

    }

    savePassData() {
        this._passService.generatePass(
            this.clientId,
            this.premiseId,
            this.generatePassForm.controls.vehicleType.value,
            this.generatePassForm.controls.passType.value,
            this.generatePassForm.controls.vehicleNumber.value
        ).subscribe((response) => {
            console.log(response)

            window.alert("Collect Rs." + response.passConfig.price + " from customer. \n" + " Pass is valid upto " + response.endDate)

            this.router.navigate(['configurations', this.clientId, this.premiseId, this.role])
        })
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
