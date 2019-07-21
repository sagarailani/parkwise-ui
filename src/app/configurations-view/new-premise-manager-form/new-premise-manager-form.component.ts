import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-new-premise-manager-form',
    templateUrl: './new-premise-manager-form.component.html',
    styleUrls: ['./new-premise-manager-form.component.css']
})
export class NewPremiseManagerFormComponent implements OnInit {

    addPremiseManagerForm: FormGroup;
    userRole: string = "MANAGER";
    clients: {}[];
    premiseForClient: {}[];

    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService) { }

    ngOnInit() {
        this.addPremiseManagerForm = this.fb.group({
            clientUsername: [''],
            premiseName: [''],
            name: [''],
            username: [''],
            password: ['']
        })

        console.log(this.clients)

        this.getClients();
        this.addPremiseManagerForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });
    }

    savePremiseManagerData() {
        console.log(this.addPremiseManagerForm.value)
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

}
