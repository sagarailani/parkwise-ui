import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LogInService } from '../log-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';

@Component({
    selector: 'app-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

    @Input() app_name: string;

    loginForm: FormGroup
    loggedIn: boolean = false;
    clientId: number;
    premiseId: number;
    role: string;
    workerId;
    modalReference: NgbModalRef;

    ngOnInit() {

        this.loginForm = this.fb.group({
            username: [''],
            password: ['']
        })

    }

    closeResult: string;

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private _loginService: LogInService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    doLogin() {

        this._loginService.getResponse(
            this.loginForm.controls.username.value,
            this.loginForm.controls.password.value,
        ).subscribe((response: string) => {
            console.log(response);
            // console.log(response['clientId'])
            this.clientId = response['clientId']
            // console.log(response['premiseId'])
            this.premiseId = response['premiseId']
            // console.log(typeof (response['roles'][0]))
            this.role = response['roles'][0];
            this.workerId = response['userId']
            localStorage.setItem("token", response['token'])
            this.modalReference.close();
            this.loggedIn = true
            if (this.role === 'WORKER') {
                console.log("In here")
                this.router.navigate(['gw', this.clientId, this.premiseId, this.role, this.workerId])
            } else {
                this.router.navigate(['other', this.clientId, this.premiseId, this.role])
            }

        })

    }

    doLogout() {
        this.loggedIn = false;
        localStorage.removeItem('token');
        this.router.navigate([''])
    }
}
