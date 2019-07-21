import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-configurations-view',
    templateUrl: './configurations-view.component.html',
    styleUrls: ['./configurations-view.component.css']
})
export class ConfigurationsViewComponent implements OnInit {

    title: string = "ParkWise";

    constructor() { }

    ngOnInit() {
    }

}
