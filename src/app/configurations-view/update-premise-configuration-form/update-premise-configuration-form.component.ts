import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-update-premise-configuration-form',
    templateUrl: './update-premise-configuration-form.component.html',
    styleUrls: ['./update-premise-configuration-form.component.css']
})
export class UpdatePremiseConfigurationFormComponent implements OnInit {

    updatePremiseConfigForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    constructor(private fb: FormBuilder) { }

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
        this.updatePremiseConfigForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            disablePremiseConfig: [''],
            entryTypeRegular: [''],
            entryTypeTemporary: [''],
            entryTypeRegularForm: this.fb.group({
                pass: [''],
                registered: [''],
                twoWheeler: [''],
                twoWheelerGroup: this.fb.group({
                    twAvailableSlots: [''],
                }),
                fourWheeler: [''],
                fourWheelerGroup: this.fb.group({
                    fwAvailableSlots: [''],
                }),
                heavy: [''],
                heavyGroup: this.fb.group({
                    hAvailableSlots: [''],
                }),
                bus: [''],
                busGroup: this.fb.group({
                    bAvailableSlots: [''],
                }),
            }),
            entryTypeTemporaryForm: this.fb.group({
                allotedTime: ['']
            }),
        })

        // console.log(this.clients)


        // this.updatePremiseConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
        //     console.log("Printing clientId: " + clientId);
        //     this.clientPremiseService.getPremiseForClient(clientId)
        //         .subscribe(premises => this.premiseForClient = premises)
        //     console.log(this.premiseForClient)
        // });

        this.patchUpdatedValues();
        console.log(this.updatePremiseConfigForm.controls.disablePremiseConfig.value)

        this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('twoWheeler').valueChanges
            .subscribe((value) => {
                let availableSlots = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('twoWheelerGroup').get('twAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('fourWheeler').valueChanges
            .subscribe((value) => {
                let availableSlots = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('fourWheelerGroup').get('fwAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('heavy').valueChanges
            .subscribe((value) => {
                let availableSlots = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('heavyGroup').get('hAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('bus').valueChanges
            .subscribe((value) => {
                let availableSlots = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('busWheelerGroup').get('bAvailableSlots');
                if (value) {
                    availableSlots.setValidators(Validators.required)
                } else {
                    availableSlots.clearValidators();
                    availableSlots.setErrors({});
                }
                availableSlots.updateValueAndValidity();
            })

        this.updatePremiseConfigForm.controls.entryTypeTemporary.valueChanges
            .subscribe((value) => {
                let allotedTime = this.updatePremiseConfigForm.controls.entryTypeTemporaryForm.get('allotedTime');
                if (value) {
                    allotedTime.setValidators(Validators.required)
                } else {
                    allotedTime.clearValidators();
                    allotedTime.setErrors({})
                }
                allotedTime.updateValueAndValidity();
            })

    }

    savePremiseConfigData() {
        console.log(this.updatePremiseConfigForm.value)
    }

    patchUpdatedValues() {
        this.updatePremiseConfigForm.controls.entryTypeRegular.setValue(true)
    }

    logValidationErrors(group: FormGroup = this.updatePremiseConfigForm) {
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
