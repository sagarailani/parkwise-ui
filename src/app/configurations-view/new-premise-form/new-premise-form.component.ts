import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-new-premise-form',
    templateUrl: './new-premise-form.component.html',
    styleUrls: ['./new-premise-form.component.css']
})
export class NewPremiseFormComponent implements OnInit {

    newPremiseDataInputForm: FormGroup;

    clients: string[] = [
        "ABCD",
        "DEFG",
        "HIJK"
    ]

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
        this.newPremiseDataInputForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
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
                    valet: [''],
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
                let availableSlots = this.newPremiseDataInputForm.controls.entryTypeRegularForm.get('busWheelerGroup').get('bAvailableSlots');
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
    }

    savePremiseData() {
        console.log(this.newPremiseDataInputForm.value)
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
