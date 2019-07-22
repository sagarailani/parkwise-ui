import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClientPremiseService } from '../client-premise.service';

@Component({
    selector: 'app-registered-vehicle',
    templateUrl: './registered-vehicle.component.html',
    styleUrls: ['./registered-vehicle.component.css']
})
export class RegisteredVehicleComponent implements OnInit {

    registerVehicleForm: FormGroup;
    clients: {}[];
    premiseForClient: {}[];

    vehicleTypes: string[] = [
        "2-Wheeler",
        "4-Wheeler",
        "Heavy Vehicle",
        "Bus",
    ]

    constructor(private fb: FormBuilder, private clientPremiseService
        : ClientPremiseService) { }

    ngOnInit() {
        this.registerVehicleForm = this.fb.group({
            clientName: [''],
            premiseName: [''],
            vehicleType: [''],
            vehicleNumber: [''],
        })
        console.log(this.clients);

        this.getClients();
        this.registerVehicleForm.controls.clientName.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
                ;
        });
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

    register() {
        console.log(this.registerVehicleForm.value);
    }
}
