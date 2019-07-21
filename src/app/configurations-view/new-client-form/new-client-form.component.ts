import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-new-client-form',
    templateUrl: './new-client-form.component.html',
    styleUrls: ['./new-client-form.component.css']
})
export class NewClientFormComponent implements OnInit {

    // usernameHelp: string = "Username should be unique";
    clientDataInputForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.clientDataInputForm = this.fb.group({
            clientName: [''],
            username: [''],

        });
    }

    saveClientData() {
        console.log(this.clientDataInputForm.value);
        this.router.navigate([''])
    }
}
