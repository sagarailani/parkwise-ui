import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-generate-pass-form',
    templateUrl: './generate-pass-form.component.html',
    styleUrls: ['./generate-pass-form.component.css']
})
export class GeneratePassFormComponent implements OnInit {
    generatePassForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.generatePassForm = this.fb.group({
            clientUsername: [''],
            premiseName: [''],
            vehicleType: [''],
            passType: [''],
            vehicleNumber: ['']
        })

        console.log(this.clients)

        this.getClients();
        this.generatePassForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });
    }

    savePassData() {
        console.log(this.generatePassForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

}
