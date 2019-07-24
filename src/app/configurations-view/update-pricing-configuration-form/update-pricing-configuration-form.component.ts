import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { PremiseService } from '../premise.service';
import { PremiseConfigService } from '../premise-config.service';
import { PricingService } from '../pricing.service';
@Component({
    selector: 'app-update-pricing-configuration-form',
    templateUrl: './update-pricing-configuration-form.component.html',
    styleUrls: ['./update-pricing-configuration-form.component.css']
})
export class UpdatePricingConfigurationFormComponent implements OnInit {

    updatePriceConfigForm: FormGroup;
    clients: {}[];
    premiseForClient: {};

    twoWheelerPresent: boolean;
    twoWheelerConfig;
    fourWheelerPresent: boolean;
    fourWheelerConfig;
    busPresent: boolean;
    busConfig;
    heavyPresent: boolean;
    heavyConfig;

    validationMessages = {
        'clientUsername': {
            'required': 'Client Username is required',
        },
        'premiseName': {
            'required': 'Premise Name is required',
        },
        'twoWheelerPricingStrategy': {
            'required': 'Select one pricing strategy',
        },
        'fourWheelerPricingStrategy': {
            'required': 'Select one pricing strategy',
        },
        'heavyPricingStrategy': {
            'required': 'Select one pricing strategy',
        },
        'busPricingStrategy': {
            'required': 'Select one pricing strategy',
        },
        'twBasePrice': {
            'required': 'Base Price is required',
        },
        'twBaseTime': {
            'required': 'Base Time is required',
        },
        'twIncrementalTime': {
            'required': 'Incremental Time is required',
        },
        'twIncrementalPrice': {
            'required': 'Incremental Price is required',
        },
        'fwBasePrice': {
            'required': 'Base Price is required',
        },
        'fwBaseTime': {
            'required': 'Base Time is required',
        },
        'fwIncrementalTime': {
            'required': 'Incremental Time is required',
        },
        'fwIncrementalPrice': {
            'required': 'Incremental Price is required',
        },
        'hBasePrice': {
            'required': 'Base Price is required',
        },
        'hBaseTime': {
            'required': 'Base Time is required',
        },
        'hIncrementalTime': {
            'required': 'Incremental Time is required',
        },
        'hIncrementalPrice': {
            'required': 'Incremental Price is required',
        },
        'bBasePrice': {
            'required': 'Base Price is required',
        },
        'bBaseTime': {
            'required': 'Base Time is required',
        },
        'bIncrementalTime': {
            'required': 'Incremental Time is required',
        },
        'bIncrementalPrice': {
            'required': 'Incremental Price is required',
        },
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'twoWheelerPricingStrategy': '',
        'twBasePrice': '',
        'twBaseTime': '',
        'twIncrementalPrice': '',
        'twIncrementalTime': '',
        'fourWheelerPricingStrategy': '',
        'fwBasePrice': '',
        'fwBaseTime': '',
        'fwIncrementalPrice': '',
        'fwIncrementalTime': '',
        'heavyPricingStrategy': '',
        'hBasePrice': '',
        'hBaseTime': '',
        'hIncrementalPrice': '',
        'hIncrementalTime': '',
        'busPricingStrategy': '',
        'bBasePrice': '',
        'bBaseTime': '',
        'bIncrementalPrice': '',
        'bIncrementalTime': '',
    }


    constructor(
        private fb: FormBuilder,
        private _userService: UserService,
        private _premiseService: PremiseService,
        private _premiseConfigService: PremiseConfigService,
        private _pricingService: PricingService) { }

    ngOnInit() {
        this.updatePriceConfigForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            disablePriceConfig: [''],
            twoWheeler: [''],
            twoWheelerPriceGroup: this.fb.group({
                twoWheelerPricingStrategy: [''],
                twBaseTime: [''],
                twBasePrice: [''],
                twIncrementalTime: [''],
                twIncrementalPrice: ['']
            }),
            fourWheeler: [''],
            fourWheelerPriceGroup: this.fb.group({
                fourWheelerPricingStrategy: [''],
                fwBaseTime: [''],
                fwBasePrice: [''],
                fwIncrementalTime: [''],
                fwIncrementalPrice: ['']
            }),
            heavy: [''],
            heavyPriceGroup: this.fb.group({
                heavyPricingStrategy: [''],
                hBaseTime: [''],
                hBasePrice: [''],
                hIncrementalTime: [''],
                hIncrementalPrice: ['']
            }),
            bus: [''],
            busPriceGroup: this.fb.group({
                busPricingStrategy: [''],
                bBaseTime: [''],
                bBasePrice: [''],
                bIncrementalTime: [''],
                bIncrementalPrice: ['']
            })
        });

        this._userService.getClients()
            .subscribe((clients) => {
                this.clients = clients;
            })

        this.updatePriceConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this._premiseService.getPremises(clientId)
                .subscribe((premises) => {
                    this.premiseForClient = premises;
                })
        });

        this.updatePriceConfigForm.controls.premiseName.valueChanges
            .subscribe((premiseId) => {
                this._premiseConfigService.getRegularConfigs(premiseId)
                this._premiseConfigService.eventSubject.subscribe((configs) => {
                    console.log(configs)
                    this.clearFormValues();
                    for (let config in configs) {
                        this.updateFormData(configs[config]);
                    }
                })
            })

        this.updatePriceConfigForm.controls.twoWheeler.valueChanges
            .subscribe((value) => {
                let pricingStrategy = this.updatePriceConfigForm.controls.twoWheelerPriceGroup.get('twoWheelerPricingStrategy');
                let priceGroup = this.updatePriceConfigForm.controls.twoWheelerPriceGroup;
                if (value) {
                    pricingStrategy.setValidators(Validators.required);
                } else {
                    pricingStrategy.clearValidators();
                    pricingStrategy.setErrors({});
                    priceGroup.get('twBaseTime').clearValidators();
                    priceGroup.get('twBaseTime').setErrors({});
                    priceGroup.get('twBaseTime').updateValueAndValidity();
                    priceGroup.get('twBasePrice').clearValidators();
                    priceGroup.get('twBasePrice').setErrors({});
                    priceGroup.get('twBasePrice').updateValueAndValidity();
                    priceGroup.get('twIncrementalTime').clearValidators();
                    priceGroup.get('twIncrementalTime').setErrors({});
                    priceGroup.get('twIncrementalTime').updateValueAndValidity();
                    priceGroup.get('twIncrementalPrice').clearValidators();
                    priceGroup.get('twIncrementalPrice').setErrors({});
                    priceGroup.get('twIncrementalPrice').updateValueAndValidity();
                }
                pricingStrategy.updateValueAndValidity();
            })
        this.updatePriceConfigForm.controls.fourWheeler.valueChanges
            .subscribe((value) => {
                let pricingStrategy = this.updatePriceConfigForm.controls.fourWheelerPriceGroup.get('fourWheelerPricingStrategy');
                let priceGroup = this.updatePriceConfigForm.controls.fourWheelerPriceGroup;
                if (value) {
                    pricingStrategy.setValidators(Validators.required);
                } else {
                    pricingStrategy.clearValidators();
                    pricingStrategy.setErrors({});
                    priceGroup.get('fwBaseTime').clearValidators();
                    priceGroup.get('fwBaseTime').setErrors({});
                    priceGroup.get('fwBaseTime').updateValueAndValidity();
                    priceGroup.get('fwBasePrice').clearValidators();
                    priceGroup.get('fwBasePrice').setErrors({});
                    priceGroup.get('fwBasePrice').updateValueAndValidity();
                    priceGroup.get('fwIncrementalTime').clearValidators();
                    priceGroup.get('fwIncrementalTime').setErrors({});
                    priceGroup.get('fwIncrementalTime').updateValueAndValidity();
                    priceGroup.get('fwIncrementalPrice').clearValidators();
                    priceGroup.get('fwIncrementalPrice').setErrors({});
                    priceGroup.get('fwIncrementalPrice').updateValueAndValidity();
                }
                pricingStrategy.updateValueAndValidity();
            })
        this.updatePriceConfigForm.controls.heavy.valueChanges
            .subscribe((value) => {
                let pricingStrategy = this.updatePriceConfigForm.controls.heavyPriceGroup.get('heavyPricingStrategy');
                let priceGroup = this.updatePriceConfigForm.controls.heavyPriceGroup;
                if (value) {
                    pricingStrategy.setValidators(Validators.required);
                } else {
                    pricingStrategy.clearValidators();
                    pricingStrategy.setErrors({});
                    priceGroup.get('hBaseTime').clearValidators();
                    priceGroup.get('hBaseTime').setErrors({});
                    priceGroup.get('hBaseTime').updateValueAndValidity();
                    priceGroup.get('hBasePrice').clearValidators();
                    priceGroup.get('hBasePrice').setErrors({});
                    priceGroup.get('hBasePrice').updateValueAndValidity();
                    priceGroup.get('hIncrementalTime').clearValidators();
                    priceGroup.get('hIncrementalTime').setErrors({});
                    priceGroup.get('hIncrementalTime').updateValueAndValidity();
                    priceGroup.get('hIncrementalPrice').clearValidators();
                    priceGroup.get('hIncrementalPrice').setErrors({});
                    priceGroup.get('hIncrementalPrice').updateValueAndValidity();
                }
                pricingStrategy.updateValueAndValidity();
            })
        this.updatePriceConfigForm.controls.bus.valueChanges
            .subscribe((value) => {
                console.log(value)
                let pricingStrategy = this.updatePriceConfigForm.controls.busPriceGroup.get('busPricingStrategy');
                let priceGroup = this.updatePriceConfigForm.controls.busPriceGroup;
                if (value) {
                    pricingStrategy.setValidators(Validators.required);
                } else if (value === false) {
                    pricingStrategy.clearValidators();
                    pricingStrategy.setErrors({});
                    priceGroup.get('bBaseTime').clearValidators();
                    priceGroup.get('bBaseTime').setErrors({});
                    priceGroup.get('bBaseTime').updateValueAndValidity();
                    priceGroup.get('bBasePrice').clearValidators();
                    priceGroup.get('bBasePrice').setErrors({});
                    priceGroup.get('bBasePrice').updateValueAndValidity();
                    priceGroup.get('bIncrementalTime').clearValidators();
                    priceGroup.get('bIncrementalTime').setErrors({});
                    priceGroup.get('bIncrementalTime').updateValueAndValidity();
                    priceGroup.get('bIncrementalPrice').clearValidators();
                    priceGroup.get('bIncrementalPrice').setErrors({});
                    priceGroup.get('bIncrementalPrice').updateValueAndValidity();
                    console.log(priceGroup)
                }
                pricingStrategy.updateValueAndValidity();
            })

        this.updatePriceConfigForm.controls.twoWheelerPriceGroup.get('twoWheelerPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePriceConfigForm.controls.twoWheelerPriceGroup
                if (value === 'fixed') {
                    control.get('twBasePrice').setValidators(Validators.required);
                } else {
                    control.get('twBasePrice').setValidators(Validators.required);
                    control.get('twBaseTime').setValidators(Validators.required);
                    control.get('twIncrementalPrice').setValidators(Validators.required);
                    control.get('twIncrementalTime').setValidators(Validators.required);
                }
                control.updateValueAndValidity();
            })
        this.updatePriceConfigForm.controls.fourWheelerPriceGroup.get('fourWheelerPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePriceConfigForm.controls.fourWheelerPriceGroup
                if (value === 'fixed') {
                    control.get('fwBasePrice').setValidators(Validators.required);
                } else {
                    control.get('fwBasePrice').setValidators(Validators.required);
                    control.get('fwBaseTime').setValidators(Validators.required);
                    control.get('fwIncrementalPrice').setValidators(Validators.required);
                    control.get('fwIncrementalTime').setValidators(Validators.required);
                }
                control.updateValueAndValidity();
            })
        this.updatePriceConfigForm.controls.heavyPriceGroup.get('heavyPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePriceConfigForm.controls.heavyPriceGroup
                if (value === 'fixed') {
                    control.get('hBasePrice').setValidators(Validators.required);
                } else {
                    control.get('hBasePrice').setValidators(Validators.required);
                    control.get('hBaseTime').setValidators(Validators.required);
                    control.get('hIncrementalPrice').setValidators(Validators.required);
                    control.get('hIncrementalTime').setValidators(Validators.required);
                }
                control.updateValueAndValidity();
            })
        this.updatePriceConfigForm.controls.busPriceGroup.get('busPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePriceConfigForm.controls.busPriceGroup
                if (value === 'fixed') {
                    control.get('bBasePrice').setValidators(Validators.required);
                } else {
                    control.get('bBasePrice').setValidators(Validators.required);
                    control.get('bBaseTime').setValidators(Validators.required);
                    control.get('bIncrementalPrice').setValidators(Validators.required);
                    control.get('bIncrementalTime').setValidators(Validators.required);
                }
                control.updateValueAndValidity();
            })


    }

    savePriceConfigData() {
        console.log(this.updatePriceConfigForm.value)
        let formControls = this.updatePriceConfigForm.controls;
        if (formControls.disablePriceConfig.value === true) {
            if (this.twoWheelerPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.twoWheelerConfig.id,
                    this.twoWheelerConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (this.fourWheelerPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.fourWheelerConfig.id,
                    this.fourWheelerConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (this.busPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.busConfig.id,
                    this.busConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (this.heavyPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.heavyConfig.id,
                    this.heavyConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
        } else {
            if (formControls.twoWheeler.value === true) {
                this._pricingService.createPricing(
                    formControls.twoWheelerPriceGroup.get('twBasePrice').value,
                    formControls.twoWheelerPriceGroup.get('twBaseTime').value,
                    formControls.twoWheelerPriceGroup.get('twIncrementalPrice').value,
                    formControls.twoWheelerPriceGroup.get('twIncrementalTime').value,
                    formControls.premiseName.value,
                    this.twoWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response);
                })
            } else if (formControls.twoWheeler.value === false && this.twoWheelerPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.twoWheelerConfig.id,
                    this.twoWheelerConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.fourWheeler.value === true) {
                this._pricingService.createPricing(
                    formControls.fourWheelerPriceGroup.get('fwBasePrice').value,
                    formControls.fourWheelerPriceGroup.get('fwBaseTime').value,
                    formControls.fourWheelerPriceGroup.get('fwIncrementalPrice').value,
                    formControls.fourWheelerPriceGroup.get('fwIncrementalTime').value,
                    formControls.premiseName.value,
                    this.fourWheelerConfig.id
                ).subscribe((response) => {
                    console.log(response);
                })
            } else if (formControls.fourWheeler.value === false && this.fourWheelerPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.fourWheelerConfig.id,
                    this.fourWheelerConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.bus.value === true) {
                this._pricingService.createPricing(
                    formControls.busPriceGroup.get('bBasePrice').value,
                    formControls.busPriceGroup.get('bBaseTime').value,
                    formControls.busPriceGroup.get('bIncrementalPrice').value,
                    formControls.busPriceGroup.get('bIncrementalTime').value,
                    formControls.premiseName.value,
                    this.busConfig.id
                ).subscribe((response) => {
                    console.log(response);
                })
            } else if (formControls.bus.value === false && this.busPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.busConfig.id,
                    this.busConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
            if (formControls.heavy.value === true) {
                this._pricingService.createPricing(
                    formControls.heavyPriceGroup.get('hBasePrice').value,
                    formControls.heavyPriceGroup.get('hBaseTime').value,
                    formControls.heavyPriceGroup.get('hIncrementalPrice').value,
                    formControls.heavyPriceGroup.get('hIncrementalTime').value,
                    formControls.premiseName.value,
                    this.heavyConfig.id
                ).subscribe((response) => {
                    console.log(response);
                })
            } else if (formControls.heavy.value === false && this.heavyPresent) {
                this._pricingService.disablePricingConfig(
                    formControls.premiseName.value,
                    this.heavyConfig.id,
                    this.heavyConfig.incrementPricing.id,
                ).subscribe((response) => {
                    console.log(response)
                })
            }
        }
    }

    logValidationErrors(group: FormGroup = this.updatePriceConfigForm) {
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
        // console.log(this.updatePriceConfigForm)
    }

    updateFormData(config) {
        if (config.vehicleType === '2-Wheeler') {
            this.twoWheelerPresent = true;
            this.twoWheelerConfig = config;
            let formControls = this.updatePriceConfigForm.controls.twoWheelerPriceGroup;
            this.updatePriceConfigForm.controls.twoWheeler.setValue(true)
            if (config.incrementPricing.incrementTime === 0) {
                formControls.get('twoWheelerPricingStrategy').setValue('fixed')
            } else {
                formControls.get('twoWheelerPricingStrategy').setValue('incremental')
            }
            formControls.get('twBaseTime').setValue(config.incrementPricing.baseTime);
            formControls.get('twBasePrice').setValue(config.incrementPricing.baseCost);
            formControls.get('twIncrementalTime').setValue(config.incrementPricing.incrementTime);
            formControls.get('twIncrementalPrice').setValue(config.incrementPricing.incrementCost);
        }
        if (config.vehicleType === '4-Wheeler') {
            this.fourWheelerPresent = true;
            this.fourWheelerConfig = config;
            let formControls = this.updatePriceConfigForm.controls.fourWheelerPriceGroup;
            this.updatePriceConfigForm.controls.fourWheeler.setValue(true)
            if (config.incrementPricing.incrementTime === 0) {
                formControls.get('fourWheelerPricingStrategy').setValue('fixed')
            } else {
                formControls.get('fourWheelerPricingStrategy').setValue('incremental')
            }
            formControls.get('fwBaseTime').setValue(config.incrementPricing.baseTime);
            formControls.get('fwBasePrice').setValue(config.incrementPricing.baseCost);
            formControls.get('fwIncrementalTime').setValue(config.incrementPricing.incrementTime);
            formControls.get('fwIncrementalPrice').setValue(config.incrementPricing.incrementCost);
        }
        if (config.vehicleType === 'Heavy') {
            this.heavyPresent = true;
            this.heavyConfig = config;
            let formControls = this.updatePriceConfigForm.controls.heavyPriceGroup;
            this.updatePriceConfigForm.controls.heavy.setValue(true)
            if (config.incrementPricing.incrementTime === 0) {
                formControls.get('heavyPricingStrategy').setValue('fixed')
            } else {
                formControls.get('heavyPricingStrategy').setValue('incremental')
            }
            formControls.get('hBaseTime').setValue(config.incrementPricing.baseTime);
            formControls.get('hBasePrice').setValue(config.incrementPricing.baseCost);
            formControls.get('hIncrementalTime').setValue(config.incrementPricing.incrementTime);
            formControls.get('hIncrementalPrice').setValue(config.incrementPricing.incrementCost);
        }
        if (config.vehicleType === 'Bus') {
            this.busPresent = true;
            this.busConfig = config;
            let formControls = this.updatePriceConfigForm.controls.twoWheelerPriceGroup;
            this.updatePriceConfigForm.controls.twoWheeler.setValue(true)
            if (config.incrementPricing.incrementTime === 0) {
                formControls.get('busPricingStrategy').setValue('fixed')
            } else {
                formControls.get('busPricingStrategy').setValue('incremental')
            }
            formControls.get('bBaseTime').setValue(config.incrementPricing.baseTime);
            formControls.get('bBasePrice').setValue(config.incrementPricing.baseCost);
            formControls.get('bIncrementalTime').setValue(config.incrementPricing.incrementTime);
            formControls.get('bIncrementalPrice').setValue(config.incrementPricing.incrementCost);
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
        this.clearRecursively((this.updatePriceConfigForm));
    }

}

