import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { PremiseService } from '../premise.service';
import { PremiseConfigService } from '../premise-config.service';
import { PassService } from '../pass.service';


@Component({
    selector: 'app-pass-config-form',
    templateUrl: './pass-config-form.component.html',
    styleUrls: ['./pass-config-form.component.css']
})
export class PassConfigFormComponent implements OnInit {

    passConfigForm: FormGroup;

    twoWheelerPresent: boolean;
    twoWheelerConfig;
    fourWheelerPresent: boolean;
    fourWheelerConfig;
    heavyPresent: boolean;
    heavyConfig;
    busPresent: boolean;
    busConfig;

    clients: any;
    premisesForClient: any;
    validationMessages = {
        'clientUsername': {
            'required': 'Client Username is required',
        },
        'premiseName': {
            'required': 'Premise Name is required',
        },
        'twWeekPrice': {
            'required': 'Price is required',
        },
        'twWeekTime': {
            'required': 'Duration is required',
        },
        'twMonthPrice': {
            'required': 'Price is required',
        },
        'twMonthTime': {
            'required': 'Duration is required',
        },
        'fwWeekPrice': {
            'required': 'Price is required',
        },
        'fwWeekTime': {
            'required': 'Duration is required',
        },
        'fwMonthPrice': {
            'required': 'Price is required',
        },
        'fwMonthTime': {
            'required': 'Duration is required',
        },
        'hWeekPrice': {
            'required': 'Price is required',
        },
        'hWeekTime': {
            'required': 'Duration is required',
        },
        'hMonthPrice': {
            'required': 'Price is required',
        },
        'hMonthTime': {
            'required': 'Duration is required',
        },
        'bWeekPrice': {
            'required': 'Price is required',
        },
        'bWeekTime': {
            'required': 'Duration is required',
        },
        'bMonthPrice': {
            'required': 'Price is required',
        },
        'bMonthTime': {
            'required': 'Duration is required',
        },
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'twWeekPrice': '',
        'twWeekTime': '',
        'twMonthPrice': '',
        'twMonthTime': '',
        'fwWeekPrice': '',
        'fwWeekTime': '',
        'fwMonthPrice': '',
        'fwMonthTime': '',
        'hWeekPrice': '',
        'hWeekTime': '',
        'hMonthPrice': '',
        'hMonthTime': '',
        'bWeekPrice': '',
        'bWeekTime': '',
        'bMonthPrice': '',
        'bMonthTime': ''
    }

    constructor(
        private fb: FormBuilder,
        private _userService: UserService,
        private _premiseService: PremiseService,
        private _premiseConfigService: PremiseConfigService,
        private _passService: PassService,
    ) { }

    ngOnInit() {

        this.passConfigForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            twoWheeler: [''],
            twoWheelerGroup: this.fb.group({
                twWeek: [''],
                twWeekPrice: [''],
                twWeekTime: [''],
                twMonth: [''],
                twMonthPrice: [''],
                twMonthTime: [''],
                twSixMonth: [''],
                twSixMonthPrice: [''],
                twSixMonthTime: [''],
            }),
            fourWheeler: [''],
            fourWheelerGroup: this.fb.group({
                fwWeek: [''],
                fwWeekPrice: [''],
                fwWeekTime: [''],
                fwMonth: [''],
                fwMonthPrice: [''],
                fwMonthTime: [''],
                fwSixMonth: [''],
                fwSixMonthPrice: [''],
                fwSixMonthTime: [''],
            }),
            heavy: [''],
            heavyGroup: this.fb.group({
                hWeek: [''],
                hWeekPrice: [''],
                hWeekTime: [''],
                hMonth: [''],
                hMonthPrice: [''],
                hMonthTime: [''],
                hSixMonth: [''],
                hSixMonthPrice: [''],
                hSixMonthTime: [''],
            }),
            bus: [''],
            busGroup: this.fb.group({
                bWeek: [''],
                bWeekPrice: [''],
                bWeekTime: [''],
                bMonth: [''],
                bMonthPrice: [''],
                bMonthTime: [''],
                bSixMonth: [''],
                bSixMonthPrice: [''],
                bSixMonthTime: [''],
            }),
        })

        this._userService.getClients()
            .subscribe((clients) => {
                this.clients = clients;
            })

        this.passConfigForm.controls.clientUsername.valueChanges
            .subscribe((clientId) => {
                this._premiseService.getPremises(clientId)
                    .subscribe((premises) => {
                        console.log(premises)
                        this.premisesForClient = premises;
                    })
            })

        this.passConfigForm.controls.premiseName.valueChanges
            .subscribe((premiseId) => {
                this._premiseConfigService.getRegularConfigs(premiseId)
                this._premiseConfigService.eventSubject
                    .subscribe((configs) => {
                        console.log(configs)
                        for (let config in configs) {
                            this.updateFormValues(configs[config])
                        }
                    })
            })
    }
    savePassConfigData() {
        console.log(this.savePassConfigData)
        if (this.twoWheelerPresent) {
            let formControls = this.passConfigForm.controls.twoWheelerGroup;
            if (formControls.get('twWeek').value === true) {
                this._passService.createPassConfig(
                    7,
                    formControls.get('twWeekTime').value,
                    formControls.get('twWeekPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.twoWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('twMonth').value === true) {
                this._passService.createPassConfig(
                    30,
                    formControls.get('twMonthTime').value,
                    formControls.get('twMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.twoWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('twSixMonth').value === true) {
                this._passService.createPassConfig(
                    180,
                    formControls.get('twSixMonthTime').value,
                    formControls.get('twSixMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.twoWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
        }
        if (this.fourWheelerPresent) {
            let formControls = this.passConfigForm.controls.fourWheelerGroup;
            if (formControls.get('fwWeek').value === true) {
                this._passService.createPassConfig(
                    7,
                    formControls.get('fwWeekTime').value,
                    formControls.get('fwWeekPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.fourWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('fwMonth').value === true) {
                this._passService.createPassConfig(
                    30,
                    formControls.get('fwMonthTime').value,
                    formControls.get('fwMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.fourWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('fwSixMonth').value === true) {
                this._passService.createPassConfig(
                    180,
                    formControls.get('fwSixMonthTime').value,
                    formControls.get('fwSixMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.fourWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
        }
        if (this.heavyPresent) {
            let formControls = this.passConfigForm.controls.heavyGroup;
            if (formControls.get('hWeek').value === true) {
                this._passService.createPassConfig(
                    7,
                    formControls.get('hWeekTime').value,
                    formControls.get('hWeekPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.heavyConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('hMonth').value === true) {
                this._passService.createPassConfig(
                    30,
                    formControls.get('hMonthTime').value,
                    formControls.get('hMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.heavyConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('hSixMonth').value === true) {
                this._passService.createPassConfig(
                    180,
                    formControls.get('hSixMonthTime').value,
                    formControls.get('hSixMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.heavyConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
        }
        if (this.busPresent) {
            let formControls = this.passConfigForm.controls.busGroup;
            if (formControls.get('bWeek').value === true) {
                this._passService.createPassConfig(
                    7,
                    formControls.get('bWeekTime').value,
                    formControls.get('bWeekPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.busConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('bMonth').value === true) {
                this._passService.createPassConfig(
                    30,
                    formControls.get('bMonthTime').value,
                    formControls.get('bMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.busConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.get('bSixMonth').value === true) {
                this._passService.createPassConfig(
                    180,
                    formControls.get('bSixMonthTime').value,
                    formControls.get('bSixMonthPrice').value,
                    this.passConfigForm.controls.premiseName.value,
                    this.busConfig.id
                ).subscribe((response) => {
                    console.log(response)
                })
            }
        }
    }

    logValidationErrors(group: FormGroup = this.passConfigForm) {
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

    updateFormValues(config) {
        // console.log(config.vehicleType)
        // console.log(config)
        if (config.vehicleType === '2-Wheeler') {

            this.twoWheelerPresent = true
            this.twoWheelerConfig = config;
        } else if (config.vehicleType === '4-Wheeler') {
            this.fourWheelerPresent = true
            this.fourWheelerConfig = config;
        } else if (config.vehicleType === 'Bus') {
            this.busPresent = true
            this.busConfig = config;
        } else if (config.vehicleType === 'Heavy') {
            this.heavyPresent = true
            this.heavyConfig = config;
        }

    }
}
