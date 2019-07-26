import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { PremiseService } from '../premise.service';
import { PremiseConfigService } from '../premise-config.service';
import { PricingService } from '../pricing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pricing-form',
    templateUrl: './pricing-form.component.html',
    styleUrls: ['./pricing-form.component.css']
})
export class PricingFormComponent implements OnInit {

    updatePricingForm: FormGroup;

    clients: {}[];
    premisesForClient: {};
    premiseConfigs: any;
    twoWheelerPresent: boolean;
    twoWheelerConfig: any;
    fourWheelerPresent: boolean;
    fourWheelerConfig: any;
    heavyPresent: boolean;
    heavyConfig: any;
    busPresent: boolean;
    busConfig: any;

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

    constructor(private fb: FormBuilder,
        private _userService: UserService,
        private _premiseService: PremiseService,
        private _premiseConfigService: PremiseConfigService,
        private _pricingService: PricingService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        this.clientId = this.route.snapshot.paramMap.get('clientId')
        this.premiseId = this.route.snapshot.paramMap.get('premiseId')
        this.role = this.route.snapshot.paramMap.get('role')

        this.updatePricingForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
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

        this.updatePricingForm.controls.twoWheeler.valueChanges
            .subscribe((value) => {
                let pricingStrategy = this.updatePricingForm.controls.twoWheelerPriceGroup.get('twoWheelerPricingStrategy');
                let priceGroup = this.updatePricingForm.controls.twoWheelerPriceGroup;
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
        this.updatePricingForm.controls.fourWheeler.valueChanges
            .subscribe((value) => {
                let pricingStrategy = this.updatePricingForm.controls.fourWheelerPriceGroup.get('fourWheelerPricingStrategy');
                let priceGroup = this.updatePricingForm.controls.fourWheelerPriceGroup;
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
        this.updatePricingForm.controls.heavy.valueChanges
            .subscribe((value) => {
                let pricingStrategy = this.updatePricingForm.controls.heavyPriceGroup.get('heavyPricingStrategy');
                let priceGroup = this.updatePricingForm.controls.heavyPriceGroup;
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
        this.updatePricingForm.controls.bus.valueChanges
            .subscribe((value) => {
                console.log(value)
                let pricingStrategy = this.updatePricingForm.controls.busPriceGroup.get('busPricingStrategy');
                let priceGroup = this.updatePricingForm.controls.busPriceGroup;
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

        this.updatePricingForm.controls.twoWheelerPriceGroup.get('twoWheelerPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePricingForm.controls.twoWheelerPriceGroup
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
        this.updatePricingForm.controls.fourWheelerPriceGroup.get('fourWheelerPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePricingForm.controls.fourWheelerPriceGroup
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
        this.updatePricingForm.controls.heavyPriceGroup.get('heavyPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePricingForm.controls.heavyPriceGroup
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
        this.updatePricingForm.controls.busPriceGroup.get('busPricingStrategy').valueChanges
            .subscribe((value) => {
                let control = this.updatePricingForm.controls.busPriceGroup
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

        if (this.role === 'ADMIN') {
            this._userService.getClients()
                .subscribe((clients) => {
                    this.clients = clients;
                    console.log(clients)
                })
        }

        if (this.role === 'MANAGER') {
            this._premiseConfigService.getRegularConfigs(this.premiseId)
            this._premiseConfigService.eventSubject
                .subscribe((configs) => {
                    this.twoWheelerPresent = false;
                    this.fourWheelerPresent = false;
                    this.busPresent = false;
                    this.heavyPresent = false;
                    this.premiseConfigs = configs;
                    console.log(configs)
                    for (let config in this.premiseConfigs) {
                        this.updateFormData(this.premiseConfigs[config]);
                    }
                })
        }

        if (this.role === 'OWNER') {
            this._premiseService.getPremises(this.clientId)
                .subscribe((premises) => {
                    this.premisesForClient = premises;
                })
        }

        this.updatePricingForm.controls.clientUsername.valueChanges
            .subscribe((clientId) => {
                this.clientId = clientId;
                this._premiseService.getPremises(this.clientId)
                    .subscribe((premises) => {
                        this.premisesForClient = premises;
                    })
            })

        this.updatePricingForm.controls.premiseName.valueChanges
            .subscribe((premiseId) => {
                this.premiseId = premiseId;
                this._premiseConfigService.getRegularConfigs(premiseId)
                this._premiseConfigService.eventSubject
                    .subscribe((configs) => {
                        this.twoWheelerPresent = false;
                        this.fourWheelerPresent = false;
                        this.busPresent = false;
                        this.heavyPresent = false;
                        this.premiseConfigs = configs;
                        console.log(configs)
                        for (let config in this.premiseConfigs) {
                            this.updateFormData(this.premiseConfigs[config]);
                        }
                    })
            })
    }

    logValidationErrors(group: FormGroup = this.updatePricingForm) {
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
        console.log(config.vehicleType)
        if (config.vehicleType === '2-WHEELER') {
            this.twoWheelerPresent = true
            this.twoWheelerConfig = config;
        } else if (config.vehicleType === '4-WHEELER') {
            this.fourWheelerPresent = true
            this.fourWheelerConfig = config;
        } else if (config.vehicleType === 'BUS') {
            this.busPresent = true
            this.busConfig = config;
        } else if (config.vehicleType === 'HEAVY') {
            this.heavyPresent = true
            this.heavyConfig = config;
        }
    }

    updatePricingConfigurations() {
        let formControls = this.updatePricingForm.controls;

        if (formControls.twoWheeler.value === true) {
            let innerControls = formControls.twoWheelerPriceGroup;
            this._pricingService.createPricing(
                innerControls.get('twBasePrice').value,
                innerControls.get('twBaseTime').value,
                innerControls.get('twIncrementalPrice').value,
                innerControls.get('twIncrementalTime').value,
                this.premiseId,
                this.twoWheelerConfig.id
            ).subscribe((response) => {
                console.log(response)
            })
        }
        if (formControls.fourWheeler.value === true) {
            let controls = formControls.fourWheelerPriceGroup;
            this._pricingService.createPricing(
                controls.get('fwBasePrice').value,
                controls.get('fwBaseTime').value,
                controls.get('fwIncrementalPrice').value,
                controls.get('fwIncrementalTime').value,
                this.premiseId,
                this.fourWheelerConfig.id
            ).subscribe((response) => {
                console.log(response)
            })
        }
        if (formControls.heavy.value === true) {
            let controls = formControls.heavyPriceGroup;
            this._pricingService.createPricing(
                controls.get('hBasePrice').value,
                controls.get('hBaseTime').value,
                controls.get('hIncrementalPrice').value,
                controls.get('hIncrementalTime').value,
                this.premiseId,
                this.heavyConfig.id
            ).subscribe((response) => {
                console.log(response)
            })
        }
        if (formControls.bus.value === true) {
            let controls = formControls.busPriceGroup;
            this._pricingService.createPricing(
                controls.get('bBasePrice').value,
                controls.get('bBaseTime').value,
                controls.get('bIncrementalPrice').value,
                controls.get('bIncrementalTime').value,
                this.premiseId,
                this.busConfig.id
            ).subscribe((response) => {
                console.log(response)
            })
        }
    }
}
