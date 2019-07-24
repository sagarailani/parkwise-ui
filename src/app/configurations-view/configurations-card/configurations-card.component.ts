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
            case "Client": this.router.navigate(['client-form'], { relativeTo: this.route })
                break;
            case "Premise": this.router.navigate(['premise-form'], { relativeTo: this.route })
                break;
            case "Premise Manager": this.router.navigate(['new-premise-manager'], { relativeTo: this.route })
                break;
            case "Gate Worker": this.router.navigate(['new-gate-worker'], { relativeTo: this.route })
                break;
            case "Pricing Strategy": this.router.navigate(['pricing'], { relativeTo: this.route })
                break;
            case "Premise Configuration": this.router.navigate(['update-premise-configuration'], { relativeTo: this.route })
                break;
            case "Generate Pass": this.router.navigate(['generate-pass'], { relativeTo: this.route })
                break;
            case "Gate Configuration": this.router.navigate(['gate-config'], { relativeTo: this.route })
                break;
            case "Registered Vehicles": this.router.navigate(['registered-vehicle'], { relativeTo: this.route })
                break;
            case "Pricing Configuration": this.router.navigate(['pricing-config'], { relativeTo: this.route })
                break;
            case "Pass Configurations": this.router.navigate(['pass-config'], { relativeTo: this.route })
                break;

        }
    }

}
