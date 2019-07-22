import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-gate-form',
    templateUrl: './gate-form.component.html',
    styleUrls: ['./gate-form.component.css']
})
export class GateFormComponent implements OnInit {
    gateConfigForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.gateConfigForm = this.fb.group({
            clientUsername: [''],
            premiseName: [''],
            gateName: [''],
        })

        console.log(this.clients)

        this.getClients();
        this.gateConfigForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });
    }

    saveGateConfigData() {
        console.log(this.gateConfigForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

}
