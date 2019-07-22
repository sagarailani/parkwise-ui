import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-update-premise-configuration-form',
    templateUrl: './update-premise-configuration-form.component.html',
    styleUrls: ['./update-premise-configuration-form.component.css']
})
export class UpdatePremiseConfigurationFormComponent implements OnInit {

    updatePremiseConfigForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.updatePremiseConfigForm = this.fb.group({
            clientUsername: [''],
            premiseName: [''],
            disablePremiseConfig: [''],
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
        })

        console.log(this.clients)

        this.getClients();
        this.updatePremiseConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });
        this.patchUpdatedValues();
        console.log(this.updatePremiseConfigForm.controls.disablePremiseConfig.value)
    }

    savePremiseManagerData() {
        console.log(this.updatePremiseConfigForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }


    patchUpdatedValues() {
        this.updatePremiseConfigForm.controls.entryTypeRegular.setValue(true)
    }
}
