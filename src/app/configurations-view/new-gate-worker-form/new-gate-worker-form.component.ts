import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-new-gate-worker-form',
    templateUrl: './new-gate-worker-form.component.html',
    styleUrls: ['./new-gate-worker-form.component.css']
})
export class NewGateWorkerFormComponent implements OnInit {

    addGateWorkerForm: FormGroup;
    userRole: string = "GATEWORKER";
    clients: {}[];
    premiseForClient: {}[];

    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.addGateWorkerForm = this.fb.group({
            clientUsername: [''],
            premiseName: [''],
            name: [''],
            username: [''],
            password: ['']
        })

        console.log(this.clients)

        this.getClients();
        this.addGateWorkerForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });
    }

    savePremiseManagerData() {
        console.log(this.addGateWorkerForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

}
