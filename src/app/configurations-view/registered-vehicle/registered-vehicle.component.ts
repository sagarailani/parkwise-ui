import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { PremiseService } from '../premise.service';
import { UserService } from '../user.service';
import { PremiseConfigService } from '../premise-config.service';
import { RegisteredVehicleService } from '../registered-vehicle.service';

@Component({
    selector: 'app-registered-vehicle',
    templateUrl: './registered-vehicle.component.html',
    styleUrls: ['./registered-vehicle.component.css']
})
export class RegisteredVehicleComponent implements OnInit {

    registerVehicleForm: FormGroup;
    clients: {};
    premiseForClient: {};
    premiseConfigs: any;

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
        'ownerName': {
            'required': 'Name is required',
        },
        'vehicleNumber': {
            'required': 'Vehicle Number is required',
        },
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'ownerName': '',
        'vehicleType': '',
        'vehicleNumber': '',
    }


    constructor(private fb: FormBuilder,
        private _userService: UserService,
        private _premiseService: PremiseService,
        private _premiseConfigService: PremiseConfigService,
        private _registeredVehicleService: RegisteredVehicleService) { }

    ngOnInit() {
        this.registerVehicleForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            vehicleType: ['', Validators.required],
            ownerName: ['', Validators.required],
            vehicleNumber: ['', Validators.required],
        })
        console.log(this.clients);

        this._userService.getClients()
            .subscribe((clients) => {
                this.clients = clients;
                console.log(this.clients)
            })

        this.registerVehicleForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log(clientId)
            this._premiseService.getPremises(clientId)
                .subscribe(premises => this.premiseForClient = premises)
        });


        this.registerVehicleForm.controls.premiseName.valueChanges.subscribe((premiseId) => {
            console.log("Printing premiseId: " + premiseId)
            this._premiseConfigService.getRegularConfigs(premiseId)
            this._premiseConfigService.eventSubject
                .subscribe((configs) => {
                    this.premiseConfigs = configs;
                })
        })

        this.registerVehicleForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })
    }

    saveRegisteredVehicleData() {
        let formGroup = this.registerVehicleForm.controls;
        console.log(formGroup)
        this._registeredVehicleService.registerVehicle(formGroup.premiseName.value, formGroup.vehicleType.value, formGroup.ownerName.value, formGroup.vehicleNumber.value)
            .subscribe((value) => {
                console.log(value)
            })
    }

    logValidationErrors(group: FormGroup = this.registerVehicleForm) {
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
