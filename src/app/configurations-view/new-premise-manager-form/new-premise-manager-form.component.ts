import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ClientService } from '../client.service';
import { PremiseService } from '../premise.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-new-premise-manager-form',
    templateUrl: './new-premise-manager-form.component.html',
    styleUrls: ['./new-premise-manager-form.component.css']
})
export class NewPremiseManagerFormComponent implements OnInit {

    addPremiseManagerForm: FormGroup;
    userRole: string = "MANAGER";
    clients: {};
    premiseForClient: {};
    clientId;
    premiseId;
    role;

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

    constructor(
        private fb: FormBuilder,
        private _userService: UserService,
        private _clientService: ClientService,
        private _premiseService: PremiseService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        this.clientId = this.route.snapshot.paramMap.get('clientId')
        this.premiseId = this.route.snapshot.paramMap.get('premiseId')
        this.role = this.route.snapshot.paramMap.get('role')

        this.addPremiseManagerForm = this.fb.group({
            clientUsername: ['', Validators.required],
            premiseName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        })

        this.addPremiseManagerForm.controls.clientUsername.valueChanges.subscribe(clientId => {
            console.log("Printing clientId: " + clientId);
            this._premiseService.getPremises(clientId)
                .subscribe((premises) => {
                    console.log(premises)
                    this.premiseForClient = premises
                })
        });

        this.addPremiseManagerForm.valueChanges.subscribe((value) => {
            this.logValidationErrors();
        })

        if (this.role === 'ADMIN') {
            this._userService.getClients()
                .subscribe((data) => {
                    console.log(data)
                    this.clients = data;
                })
        }

        this.addPremiseManagerForm.controls.clientUsername.valueChanges
            .subscribe((clientId) => {
                this.clientId = clientId;
            })

        this.addPremiseManagerForm.controls.premiseName.valueChanges
            .subscribe((premiseId) => {
                this.premiseId = premiseId;
            })

    }

    savePremiseManagerData() {
        let present = this._userService.checkForUsername(this.addPremiseManagerForm.get('username').value)
            .subscribe((value) => {
                console.log(value)
                if (value === false) {
                    this.formErrors['username'] = ""
                    this.formErrors['username'] += this.validationMessages['username']['unique'];
                    return;
                } else {
                    this.formErrors['username'] = ""
                    this._userService.addUser(
                        this.premiseId,
                        this.addPremiseManagerForm.controls.username.value,
                        this.addPremiseManagerForm.controls.password.value,
                        this.userRole
                    ).subscribe((value) => {
                        console.log(value)
                    })
                }
            })

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
