import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

    @Input() app_name: string;

    constructor() { }

    ngOnInit() {
    }

}
