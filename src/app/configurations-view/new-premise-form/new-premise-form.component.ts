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
                    availableSlots: [''],
                }),
                fourWheeler: [''],
                fourWheelerGroup: this.fb.group({
                    availableSlots: [''],
                }),
                heavy: [''],
                heavyGroup: this.fb.group({
                    availableSlots: [''],
                }),
                bus: [''],
                busGroup: this.fb.group({
                    availableSlots: [''],
                }),
            }),
            entryTypeTemporaryForm: this.fb.group({
                allotedTime: ['']
            }),
        });
    }

    savePremiseData() {
        console.log(this.newPremiseDataInputForm.value)
    }

}
