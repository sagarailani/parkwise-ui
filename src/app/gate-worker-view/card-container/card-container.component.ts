import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { staticViewQueryIds } from '@angular/compiler';
import { GateService } from 'src/app/configurations-view/gate.service';

@Component({
    selector: 'app-card-container',
    templateUrl: './card-container.component.html',
    styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

    @ViewChild('content', null) content: NgbModal;
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private modalService: NgbModal,
        private _gateService: GateService,
    ) { }

    clientId;
    premiseId;
    role: string;
    workerId;
    gates;
    currentGateId;

    gateForm: FormGroup;
    modalReference: NgbModalRef;

    ngOnInit() {

        this.clientId = this.route.snapshot.paramMap.get('clientId')
        this.premiseId = this.route.snapshot.paramMap.get('premiseId')
        this.role = this.route.snapshot.paramMap.get('role')
        this.workerId = this.route.snapshot.paramMap.get('workerId')
        console.log("client id: " + this.clientId)
        console.log("premise id: " + this.premiseId);
        console.log("role: " + this.role)
        console.log("worker id: " + this.workerId);

        this._gateService.getGatesForPremise(this.premiseId)
            .subscribe((gates) => {
                this.gates = gates;
            })

        this.openBackDropCustomClass(this.content);
        console.log("Gate id: " + this.currentGateId)

        this.gateForm = this.fb.group({
            gateName: ['', Validators.required]
        })

    }

    saveGateInfo() {
        this.currentGateId = this.gateForm.controls.gateName.value;
        console.log(this.currentGateId)
        this.modalReference.close();
    }

    openBackDropCustomClass(content) {
        this.modalReference = this.modalService.open(content, {
            backdrop: "static",
            keyboard: false,
            backdropClass: 'light-blue-backdrop',
            centered: true
        });
    }
}
