import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';
import { UserService } from '../user.service';

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

    validationMessages = {
        'clientUsername': {
            'required': 'Client Username is required',
        },
        'premiseName': {
            'required': 'Premise Name is required',
        },
        'username': {
            'required': 'Username is required',
            'unique': 'Username already exists, try another one',
        },
        'password': {
            'required': 'Password is required'
        }
    }

    formErrors = {
        'clientUsername': '',
        'premiseName': '',
        'username': '',
        'password': '',
    }

    constructor(private fb: FormBuilder, private clientPremiseService: ClientPremiseService, private userService: UserService) { }

    ngOnInit() {
        this.addGateWorkerForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        })

        console.log(this.clients)

        this.getClients();
        this.addGateWorkerForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });

        this.addGateWorkerForm.valueChanges.subscribe(() => {
            this.logValidationErrors();

        })
    }

    saveGateWorkerData() {
        let isPresent = this.userService.checkForUsername(this.addGateWorkerForm.get('username').value)
        if (isPresent) {
            this.formErrors['username'] = ""
            this.formErrors['username'] += this.validationMessages['username']['unique'];
        } else {
            this.formErrors['username'] = ""
            console.log("This data will be sent to Server: ")
            console.log(this.addGateWorkerForm.value)
        }

    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

    logValidationErrors(group: FormGroup = this.addGateWorkerForm) {
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
