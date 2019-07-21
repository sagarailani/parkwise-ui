import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-gate-worker-view',
    templateUrl: './gate-worker-view.component.html',
    styleUrls: ['./gate-worker-view.component.css']
})
export class GateWorkerViewComponent implements OnInit {

    title: string = "ParkWise"

    constructor() { }

    ngOnInit() {
    }

}
