import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-update-pricing-configuration-form',
    templateUrl: './update-pricing-configuration-form.component.html',
    styleUrls: ['./update-pricing-configuration-form.component.css']
})
export class UpdatePricingConfigurationFormComponent implements OnInit {

    updatePriceConfigForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.updatePriceConfigForm = this.fb.group({
            clientUsername: [''],
            premiseName: [''],
            disablePriceConfig: [''],
            twoWheeler: [''],
            twoWheelerPriceGroup: this.fb.group({
                twoWheelerPricingStrategy: [''],
                baseTime: [''],
                basePrice: [''],
                incrementalTime: [''],
                incrementalPrice: ['']
            }),
            fourWheeler: [''],
            fourWheelerPriceGroup: this.fb.group({
                fourWheelerPricingStrategy: [''],
                baseTime: [''],
                basePrice: [''],
                incrementalTime: [''],
                incrementalPrice: ['']
            }),
            heavy: [''],
            heavyPriceGroup: this.fb.group({
                heavyPricingStrategy: [''],
                baseTime: [''],
                basePrice: [''],
                incrementalTime: [''],
                incrementalPrice: ['']
            }),
            bus: [''],
            busPriceGroup: this.fb.group({
                busPricingStrategy: [''],
                baseTime: [''],
                basePrice: [''],
                incrementalTime: [''],
                incrementalPrice: ['']
            })
        })

        console.log(this.clients)

        this.getClients();
        this.updatePriceConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });
    }

    savePriceConfigData() {
        console.log(this.updatePriceConfigForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

    patchUpdatedValues() {
        this.updatePriceConfigForm.controls.entryTypeRegular.setValue(true)
    }
}

