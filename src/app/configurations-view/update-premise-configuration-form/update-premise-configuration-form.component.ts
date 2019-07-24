import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PremiseConfigService } from '../premise-config.service';
import { PremiseService } from '../premise.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-update-premise-configuration-form',
    templateUrl: './update-premise-configuration-form.component.html',
    styleUrls: ['./update-premise-configuration-form.component.css']
})
export class UpdatePremiseConfigurationFormComponent implements OnInit {

    updatePremiseConfigForm: FormGroup;
    clients: {}[];
    premiseForClient: {};
    temporaryPresent;
    temporaryActive;
    temporaryConfig;
    twoWheelerPresent;
    twoWheelerActive;
    twoWheelerConfig;
    fourWheelerPresent;
    fourWheelerActive;
    fourWheelerConfig;
    heavyPresent;
    heavyActive;
    heavyConfig;
    busPresent;
    busActive;
    busConfig;
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
        this.updatePremiseConfigForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            disablePremiseConfig: [''],
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
        })

        this._userService.getClients()
            .subscribe((clients) => {
                this.clients = clients;
            })

        this.updatePremiseConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this._premiseService.getPremises(clientId)
                .subscribe((premises) => {
                    this.premiseForClient = premises;
                })
        });

        this.updatePremiseConfigForm.controls.premiseName.valueChanges
            .subscribe((premiseId) => {
                this._premiseConfigService.getAllConfigs(premiseId)
                    .subscribe((configs) => {
                        this.clearFormValues();
                        for (let config in configs) {
                            this.updateFormData(configs[config]);
                        }
                    })
            })

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
                let availableSlots = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('busGroup').get('bAvailableSlots');
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
        let formControls = this.updatePremiseConfigForm.controls;
        if (formControls.disablePremiseConfig.value === 'true') {
            if (this.twoWheelerPresent && this.twoWheelerActive) {
                //disable premise    
            }
            if (this.fourWheelerPresent && this.fourWheelerActive) {
                //disable premise    
            }
            if (this.heavyActive && this.heavyPresent) {
                //disable premise    
            }
            if (this.busActive && this.busPresent) {
                //disable premise    
            }
        }

        if (formControls.entryTypeRegular.value === true) {
            let innerControls = formControls.entryTypeRegularForm;

            if (innerControls.get('twoWheeler').value === true) {
                if (this.twoWheelerPresent) {
                    if (this.twoWheelerConfig.incrementPricing === null) {
                        this._premiseConfigService.updatePremiseRegularConfig(
                            innerControls.get('twoWheelerGroup').get('twAvailableSlots').value,
                            '2-Wheeler',
                            false,
                            innerControls.get('twoWheelerGroup').get('registered').value,
                            innerControls.get('twoWheelerGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.twoWheelerConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    } else {
                        this._premiseConfigService.updatePremiseRegularConfigWithPrice(
                            innerControls.get('twoWheelerGroup').get('twAvailableSlots').value,
                            '2-Wheeler',
                            false,
                            innerControls.get('twoWheelerGroup').get('registered').value,
                            innerControls.get('twoWheelerGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.twoWheelerConfig.incrementPricing.id,
                            this.twoWheelerConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    }
                } else {
                    this._premiseConfigService.createRegularConfig(
                        innerControls.get('twoWheelerGroup').get('twAvailableSlots').value,
                        '2-Wheeler',
                        false,
                        innerControls.get('twoWheelerGroup').get('registered').value,
                        innerControls.get('twoWheelerGroup').get('pass').value,
                        formControls.premiseName.value,
                        formControls.clientId.value
                    ).subscribe((response) => {
                        console.log(response);
                    })
                }
            } else if (this.twoWheelerPresent) {
                //disable two wheeler
            }

            if (innerControls.get('fourWheeler').value === true) {
                if (this.fourWheelerPresent) {
                    if (this.fourWheelerConfig.incrementPricing === null) {
                        this._premiseConfigService.updatePremiseRegularConfig(
                            innerControls.get('fourWheelerGroup').get('fwAvailableSlots').value,
                            '4-Wheeler',
                            innerControls.get('fourWheelerGroup').get('valet').value,
                            innerControls.get('fourWheelerGroup').get('registered').value,
                            innerControls.get('fourWheelerGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.fourWheelerConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    } else {
                        this._premiseConfigService.updatePremiseRegularConfigWithPrice(
                            innerControls.get('fourWheelerGroup').get('fwAvailableSlots').value,
                            '4-Wheeler',
                            innerControls.get('fourWheelerGroup').get('valet').value,
                            innerControls.get('fourWheelerGroup').get('registered').value,
                            innerControls.get('fourWheelerGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.fourWheelerConfig.incrementPricing.id,
                            this.fourWheelerConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    }
                } else {
                    this._premiseConfigService.createRegularConfig(
                        innerControls.get('fourWheelerGroup').get('fwAvailableSlots').value,
                        '4-Wheeler',
                        innerControls.get('fourWheelerGroup').get('valet').value,
                        innerControls.get('fourWheelerGroup').get('registered').value,
                        innerControls.get('fourWheelerGroup').get('pass').value,
                        formControls.premiseName.value,
                        formControls.clientUsername.value
                    ).subscribe((response) => {
                        console.log(response);
                    })
                }
            } else if (this.fourWheelerPresent) {
                //disable four wheeler
            }

            if (innerControls.get('heavy').value === true) {
                if (this.heavyPresent) {
                    if (this.heavyConfig.incrementPricing === null) {
                        this._premiseConfigService.updatePremiseRegularConfig(
                            innerControls.get('heavyGroup').get('hAvailableSlots').value,
                            'Heavy',
                            false,
                            innerControls.get('heavyGroup').get('registered').value,
                            innerControls.get('heavyGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.heavyConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    } else {
                        this._premiseConfigService.updatePremiseRegularConfigWithPrice(
                            innerControls.get('heavyGroup').get('hAvailableSlots').value,
                            'Heavy',
                            false,
                            innerControls.get('heavyGroup').get('registered').value,
                            innerControls.get('heavyGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.heavyConfig.incrementPricing.id,
                            this.heavyConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    }
                } else {
                    this._premiseConfigService.createRegularConfig(
                        innerControls.get('heavyGroup').get('hAvailableSlots').value,
                        'Heavy',
                        false,
                        innerControls.get('heavyGroup').get('registered').value,
                        innerControls.get('heavyGroup').get('pass').value,
                        formControls.premiseName.value,
                        formControls.clientId.value
                    ).subscribe((response) => {
                        console.log(response);
                    })
                }
            } else if (this.heavyPresent) {
                //disable heavy
            }

            if (innerControls.get('bus').value === true) {
                if (this.busPresent) {
                    if (this.busConfig.incrementPricing === null) {
                        this._premiseConfigService.updatePremiseRegularConfig(
                            innerControls.get('busGroup').get('bAvailableSlots').value,
                            'Bus',
                            false,
                            innerControls.get('busGroup').get('registered').value,
                            innerControls.get('busGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.busConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    } else {
                        this._premiseConfigService.updatePremiseRegularConfigWithPrice(
                            innerControls.get('busGroup').get('bAvailableSlots').value,
                            'Bus',
                            false,
                            innerControls.get('busGroup').get('registered').value,
                            innerControls.get('busGroup').get('pass').value,
                            formControls.premiseName.value,
                            this.busConfig.incrementPricing.id,
                            this.busConfig.id
                        ).subscribe((response) => {
                            console.log(response)
                        })
                    }
                } else {
                    this._premiseConfigService.createRegularConfig(
                        innerControls.get('busGroup').get('bAvailableSlots').value,
                        'Bus',
                        false,
                        innerControls.get('busGroup').get('registered').value,
                        innerControls.get('busGroup').get('pass').value,
                        formControls.premiseName.value,
                        formControls.clientId.value
                    ).subscribe((response) => {
                        console.log(response);
                    })
                }
            } else if (this.busPresent) {
                //disable bus config
            }
        }

        if (formControls.entryTypeTemporary.value === true) {
            let innerControls = formControls.entryTypeTemporaryForm;

            if (this.temporaryActive) {
                console.log(innerControls.get('allotedTime').value)
                this._premiseConfigService.updatePremiseTempConfig(
                    innerControls.get('allotedTime').value,
                    formControls.premiseName.value,
                    this.temporaryConfig.id,
                    this.temporaryConfig.incrementPricing.id
                ).subscribe((response) => {
                    console.log(response)
                })
            } else {
                innerControls.get('allotedTime').value
                this._premiseConfigService.createTempConfig(
                    innerControls.get('allotedTime').value,
                    formControls.premiseName.value,
                    formControls.clientUsername.value
                ).subscribe((response) => {
                    console.log(response)
                })
            }

        } else if (this.temporaryActive) {
            //disable temporary
        }
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

    updateFormData(config) {
        console.log(config)
        console.log(config.active);
        if (config.entryType === 'REGULAR') {
            this.updatePremiseConfigForm.controls.entryTypeRegular.setValue(true);
        }
        if ((config.entryType === 'TEMPORARY') && (config.active === true)) {
            console.log('Temp true is executed')
            this.temporaryActive = true;
            this.temporaryConfig = config;
            this.temporaryPresent = true;
            this.updatePremiseConfigForm.controls.entryTypeTemporary.setValue(true);
            this.updatePremiseConfigForm.controls.entryTypeTemporaryForm.get('allotedTime').setValue(config.incrementPricing.baseTime)
        }
        if ((config.entryType === 'TEMPORARY') && (config.active === false)) {
            console.log('Temp false is executed')
            this.temporaryConfig = config;
            this.temporaryActive = true;
            this.temporaryActive = false;
        }
        if ((config.vehicleType == "2-Wheeler") && (config.active === true)) {
            console.log('2W true is executed')
            let formControls = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('twoWheelerGroup');
            this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('twoWheeler').setValue(true);
            console.log(this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('twoWheeler').value)
            formControls.get('pass').setValue(config.passAvailable);
            formControls.get('registered').setValue(config.registrationRequired);
            formControls.get('twAvailableSlots').setValue(config.maxCount);
            this.twoWheelerPresent = true
            this.twoWheelerActive = true
            this.twoWheelerConfig = config
        }
        if (config.vehicleType === '2-Wheeler' && config.active == false) {
            console.log('2W false is executed')
            this.twoWheelerPresent = true
            this.twoWheelerActive = false;
            this.twoWheelerConfig = config
        }
        if (config.vehicleType === '4-Wheeler' && config.active == true) {
            console.log('4W true is executed')
            this.fourWheelerActive = true
            this.fourWheelerPresent = true
            this.fourWheelerConfig = config
            let formControls = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('fourWheelerGroup');
            this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('fourWheeler').setValue(true)
            formControls.get('pass').setValue(config.passAvailable)
            formControls.get('valet').setValue(config.valetAvailable)
            formControls.get('registered').setValue(config.registrationRequired)
            formControls.get('fwAvailableSlots').setValue(config.maxCount)
        }
        if (config.vehicleType === '4-Wheeler' && config.active == false) {
            console.log('4W false is executed')
            this.fourWheelerPresent = true
            this.fourWheelerActive = false
            this.fourWheelerConfig = config
        }
        if (config.vehicleType === 'Heavy' && config.active == true) {
            console.log('h true is executed')
            this.heavyActive = true;
            this.heavyPresent = true;
            this.heavyConfig = config;
            let formControls = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('heavyGroup');
            this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('heavy').setValue(true)
            formControls.get('pass').setValue(config.passAvailable)
            formControls.get('registered').setValue(config.registrationRequired)
            formControls.get('hAvailableSlots').setValue(config.maxCount)
        }
        if (config.vehicleType === 'Heavy' && config.active == false) {
            console.log('h false is executed')
            this.heavyPresent = true;
            this.heavyActive = false;
            this.heavyConfig = config;
        }
        if (config.vehicleType === 'Bus' && config.active == true) {
            console.log('b true is executed')
            this.busActive = true
            this.busPresent = true
            this.busConfig = config;
            let formControls = this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('busGroup');
            this.updatePremiseConfigForm.controls.entryTypeRegularForm.get('bus').setValue(true)
            formControls.get('pass').setValue(config.passAvailable)
            formControls.get('registered').setValue(config.registrationRequired)
            formControls.get('bAvailableSlots').setValue(config.maxCount)
        }
        if (config.vehicleType === 'Bus' && config.active == false) {
            console.log('b false is executed')
            this.busPresent = true
            this.busActive = false
            this.busConfig = config;
        }
    }

    clearRecursively(form: FormGroup) {
        Object.keys(form.controls).forEach((key: string) => {
            let flag = true;
            if (key === 'clientUsername' || key === 'premiseName') {
                flag = false;
            }
            if (flag === true) {
                const abstractControl = form.get(key);
                if (abstractControl instanceof FormGroup) {
                    this.clearRecursively(abstractControl)
                } else {
                    abstractControl.setValue('');
                }
            }
        })
    }
    clearFormValues() {
        console.log("form values are cleared")
        this.clearRecursively((this.updatePremiseConfigForm));
    }
}
