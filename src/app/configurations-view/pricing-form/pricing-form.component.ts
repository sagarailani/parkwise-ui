import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-pricing-form',
    templateUrl: './pricing-form.component.html',
    styleUrls: ['./pricing-form.component.css']
})
export class PricingFormComponent implements OnInit {

    updatePricingForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {

        this.updatePricingForm = this.fb.group({
            clientUsername: [''],
            premiseName: [''],
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
        });

    }

}
