import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClientService } from '../client.service';
import { UserService } from '../user.service';
import { PremiseService } from '../premise.service';
import { PremiseConfigService } from '../premise-config.service';

@Component({
    selector: 'app-new-premise-form',
    templateUrl: './new-premise-form.component.html',
    styleUrls: ['./new-premise-form.component.css']
})
export class NewPremiseFormComponent implements OnInit {

    newPremiseDataInputForm: FormGroup;

    clients: any;

    constructor(private fb: FormBuilder,
        private _userService: UserService,
        private _premiseService: PremiseService,
        private _premiseConfigService: PremiseConfigService) { }

    validationMessages = {
        'clientUsername': {
            'required': 'Client Username is required',
        },
        'premiseName': {
            'required': 'Premise Name is required',
        },
        'twAvailableSlots': {
            'required': 'Please specify available slots'
        },
        'fwAvailableSlots': {
            'required': 'Please specify available slots'
        },
        'hAvailableSlots': {
            'required': 'Please specify available slots'
        },
        'bAvailableSlots': {
            'required': 'Please specify available slots'
        },
        'allotedTime': {
            'required': 'Please specify alloted time'
        }
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'twAvailableSlots': '',
        'fwAvailableSlots': '',
        'hAvailableSlots': '',
        'bAvailableSlots': '',
        'allotedTime': '',
    }

    ngOnInit() {
        this.newPremiseDataInputForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            entryTypeRegular: [''],
            entryTypeTemporary: [''],
            entryTypeRegularForm: this.fb.group({
                twoWheeler: [''],
                twoWheelerGroup: this.fb.group({
                    pass: [''],
                    registered: [''],
                    twAvailableSlots: [''],
                }),
                fourWheeler: [''],
                fourWheelerGroup: this.fb.group({
                    pass: [''],
                    registered: [''],
                    valet: [''],
                    fwAvailableSlots: [''],
                }),
                heavy: [''],
                heavyGroup: this.fb.group({
                    pass: [''],
                    registered: [''],
                    hAvailableSlots: [''],
                }),
                bus: [''],
                busGroup: this.fb.group({
                    pass: [''],
                    registered: [''],
                    bAvailableSlots: [''],
                }),
            }),
            entryTypeTemporaryForm: this.fb.group({
                allotedTime: ['']
            }),
        });

        this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('twoWheeler').valueChanges
            .subscribe((value) => {
                let availableSlots = this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('twoWheelerGroup').get('twAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('fourWheeler').valueChanges
            .subscribe((value) => {
                let availableSlots = this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('fourWheelerGroup').get('fwAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('heavy').valueChanges
            .subscribe((value) => {
                let availableSlots = this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('heavyGroup').get('hAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('bus').valueChanges
            .subscribe((value) => {
                let availableSlots = this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('busGroup').get('bAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.newPremiseDataInputForm.controls.entryTypeTemporary.valueChanges
            .subscribe((value) => {
                let allotedTime = this.newPremiseDataInputForm.controls.entryTypeTemporaryForm.get('allotedTime');
                if (value) {
                    allotedTime.setValidators(Validators.required)
                } else {
                    allotedTime.clearValidators();
                    allotedTime.setErrors({})
                }
                allotedTime.updateValueAndValidity();
            })

        this._userService.getClients()
            .subscribe((clients) => {
                this.clients = clients;
            })

        // this._clientService.getClients()
        //     .subscribe((value) => {
        //         this.clients = value;
        //         console.log(this.clients)
        //     })
        // this.newPremiseDataInputForm.controls.clientUsername.setValue('SAMPLE');
    }

    savePremiseData() {
        console.log(this.newPremiseDataInputForm.value)
        let premiseId;
        this._premiseService.createNewPremise(this.newPremiseDataInputForm.controls.clientUsername.value
            , this.newPremiseDataInputForm.controls.premiseName.value)
            .subscribe((value) => {
                console.log(value)
                premiseId = value.id;
                console.log(premiseId)
                let formControls = this.newPremiseDataInputForm.controls;
                let entryTypeFormControls = this.newPremiseDataInputForm.controls.entryTypeRegularForm;
                if (premiseId !== null) {

                    if (formControls.entryTypeRegular.value === true) {
                        if (entryTypeFormControls.get('twoWheeler').value === true) {
                            this._premiseConfigService.createRegularConfig(
                                entryTypeFormControls.get('twoWheelerGroup').get('twAvailableSlots').value,
                                '2-WHEELER',
                                false,
                                entryTypeFormControls.get('twoWheelerGroup').get('registered').value,
                                entryTypeFormControls.get('twoWheelerGroup').get('pass').value,
                                premiseId,
                                formControls.clientUsername.value
                            ).subscribe((value) => {
                                console.log(value)
                            })
                        }
                        if (entryTypeFormControls.get('fourWheeler').value === true) {
                            this._premiseConfigService.createRegularConfig(
                                entryTypeFormControls.get('fourWheelerGroup').get('fwAvailableSlots').value,
                                '4-WHEELER',
                                entryTypeFormControls.get('fourWheelerGroup').get('valet').value,
                                entryTypeFormControls.get('fourWheelerGroup').get('registered').value,
                                entryTypeFormControls.get('fourWheelerGroup').get('pass').value,
                                premiseId,
                                formControls.clientUsername.value
                            ).subscribe((value) => {
                                console.log(value)
                            })
                        }
                        if (entryTypeFormControls.get('heavy').value === true) {
                            this._premiseConfigService.createRegularConfig(
                                entryTypeFormControls.get('heavyGroup').get('hAvailableSlots').value,
                                'HEAVY',
                                false,
                                entryTypeFormControls.get('heavyGroup').get('registered').value,
                                entryTypeFormControls.get('heavyGroup').get('pass').value,
                                premiseId,
                                formControls.clientUsername.value
                            ).subscribe((value) => {
                                console.log(value)
                            })
                        }
                        if (entryTypeFormControls.get('bus').value === true) {
                            this._premiseConfigService.createRegularConfig(
                                entryTypeFormControls.get('busGroup').get('bAvailableSlots').value,
                                'BUS',
                                false,
                                entryTypeFormControls.get('busGroup').get('registered').value,
                                entryTypeFormControls.get('busGroup').get('pass').value,
                                premiseId,
                                formControls.clientUsername.value
                            ).subscribe((value) => {
                                console.log(value)
                            })
                        }
                    }
                    if (formControls.entryTypeTemporary.value === true) {
                        this._premiseConfigService.createTempConfig(
                            formControls.entryTypeTemporaryForm.get('allotedTime').value,
                            premiseId,
                            formControls.clientUsername.value
                        ).subscribe((value) => {
                            console.log(value)
                        })
                    }
                }
            })

    }


    logValidationErrors(group: FormGroup = this.newPremiseDataInputForm) {
        Object.keys(group.controls).forEach((key: string) => {
            const abstractControl = group.get(key);
            if (abstractControl instanceof FormGroup) {
                this.logValidationErrors(abstractControl)
            } else {
                if (abstractControl && abstractControl.invalid && (
                    abstractControl.touched || abstractControl.dirty
                )) {
                    // console.log(key)
                    this.formErrors[key] = ""
                    const messages = this.validationMessages[key];
                    // console.log(key + " : " + messages)
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
        // console.log(this.updatePricingForm)
    }
}
