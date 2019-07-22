import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
    selector: 'app-new-client-form',
    templateUrl: './new-client-form.component.html',
    styleUrls: ['./new-client-form.component.css']
})
export class NewClientFormComponent implements OnInit {

    // usernameHelp: string = "Username should be unique";
    clientDataInputForm: FormGroup;

    validationMessages = {
        'clientName': {
            'required': 'Client Name is required',
        },
        'username': {
            'required': 'Username is required',
            'unique': 'Username already taken, try another one'
        },
        'password': {
            'required': 'Password is required',
        }
    }

    formErrors = {
        'clientName': '',
        'username': '',
        'password': '',
    }


    constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.clientDataInputForm = this.fb.group({
            clientName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.clientDataInputForm.valueChanges.subscribe((data) => {
            this.logValidationErrors(this.clientDataInputForm);
        })
    }

    saveClientData() {
        let isPresent = this.userService.checkForUsername(this.clientDataInputForm.get('username').value)
        if (isPresent) {
            this.formErrors['username'] = ""
            this.formErrors['username'] += this.validationMessages['username']['unique'];
        } else {
            this.formErrors['username'] = ""
            console.log("This data will be sent to Server: ")
            console.log(this.clientDataInputForm.value)
        }
    }

    logValidationErrors(group: FormGroup = this.clientDataInputForm) {
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
