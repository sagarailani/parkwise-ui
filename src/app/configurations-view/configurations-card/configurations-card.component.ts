import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-configurations-card',
    templateUrl: './configurations-card.component.html',
    styleUrls: ['./configurations-card.component.css']
})

export class ConfigurationsCardComponent implements OnInit {

    @Input() configurationName: string;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
    }

    navigateToForm() {
        switch (this.configurationName) {
            case "Client": this.router.navigate(['client-form'], { relativeTo: this.route });
            case "Premise": this.router.navigate(['premise-form'], { relativeTo: this.route })
        }
    }

}
