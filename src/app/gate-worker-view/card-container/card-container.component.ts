import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-card-container',
    templateUrl: './card-container.component.html',
    styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

    clientId;
    premiseId;
    role: string;

    ngOnInit() {

        this.clientId = this.route.snapshot.paramMap.get('clientId')
        this.premiseId = this.route.snapshot.paramMap.get('premiseId')
        this.role = this.route.snapshot.paramMap.get('role')
        console.log("client id: " + this.clientId)
        console.log("premise id: " + this.premiseId);
        console.log("role: " + this.role)

    }

}
