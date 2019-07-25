import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LogInService } from '../log-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Component({
    selector: 'app-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

    @Input() app_name: string;

    loginForm: FormGroup
    loggedIn: boolean;
    clientId: number;
    premiseId: number;
    role: string;
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
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
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
            localStorage.setItem("token", response['token'])
            if (this.role === 'WORKER') {
                console.log("In here")
                this.router.navigate(['gw', this.clientId, this.premiseId, this.role])
            } else {
                this.router.navigate(['other'])
            }

        })

    }


}
