import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ClientService } from '../client.service';
import { PremiseService } from '../premise.service';

@Component({
    selector: 'app-new-gate-worker-form',
    templateUrl: './new-gate-worker-form.component.html',
    styleUrls: ['./new-gate-worker-form.component.css']
})
export class NewGateWorkerFormComponent implements OnInit {

    addGateWorkerForm: FormGroup;
    userRole: string = "WORKER";
    clients: {};
    premiseForClient: {};

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

    constructor(private fb: FormBuilder,
        private _userService: UserService,
        private _clientService: ClientService,
        private _premiseService: PremiseService) { }

    ngOnInit() {
        this.addGateWorkerForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        })

        // console.log(this.clients)

        this.addGateWorkerForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this._premiseService.getPremises(clientId)
                .subscribe(premises => this.premiseForClient = premises)

        });

        this._clientService.getClients()
            .subscribe((clients) => {
                this.clients = clients
            });


        this.addGateWorkerForm.valueChanges.subscribe(() => {
            this.logValidationErrors();

        })
    }

    saveGateWorkerData() {
        this._userService.checkForUsername(this.addGateWorkerForm.get('username').value)
            .subscribe((value) => {
                console.log(value)
                if (value === false) {
                    this.formErrors['username'] = ""
                    this.formErrors['username'] += this.validationMessages['username']['unique'];
                    return;
                } else {
                    this.formErrors['username'] = ""
                    this._userService.addUser(this.addGateWorkerForm.value, this.userRole)
                        .subscribe((value) => {
                            console.log(value)
                        })
                }
            })
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
