import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientPremiseService } from '../client-premise.service';
import { UserService } from '../user.service';

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
        this.addPremiseManagerForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        })

        this.getClients();
        this.addPremiseManagerForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this.clientPremiseService.getPremiseForClient(clientId)
                .subscribe(premises => this.premiseForClient = premises)
            console.log(this.premiseForClient)
        });

        this.addPremiseManagerForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })
    }

    savePremiseManagerData() {
        let isPresent = this.userService.checkForUsername(this.addPremiseManagerForm.get('username').value)
        if (isPresent) {
            this.formErrors['username'] = ""
            this.formErrors['username'] += this.validationMessages['username']['unique'];
        } else {
            this.formErrors['username'] = ""
            console.log("This data will be sent to Server: ")
            console.log(this.addPremiseManagerForm.value)
        }
    }

    getClients() {
        this.clientPremiseService.getClients()
            .subscribe(clients => this.clients = clients)
    }

    logValidationErrors(group: FormGroup = this.addPremiseManagerForm) {
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
