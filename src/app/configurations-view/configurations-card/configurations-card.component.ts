import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-configurations-card',
    templateUrl: './configurations-card.component.html',
    styleUrls: ['./configurations-card.component.css']
})

export class ConfigurationsCardComponent implements OnInit {

    @Input() configurationName: string;
    @Input() clientId;
    @Input() premiseId;
    @Input() role;

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
    }

    navigateToForm() {
        switch (this.configurationName) {
            case "Client": this.router.navigate(['client-form', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Premise": this.router.navigate(['premise-form', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Premise Manager": this.router.navigate(['new-premise-manager', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Gate Worker": this.router.navigate(['new-gate-worker', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Pricing Strategy": this.router.navigate(['pricing', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Premise Configuration": this.router.navigate(['update-premise-configuration', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Generate Pass": this.router.navigate(['generate-pass', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Gate Configuration": this.router.navigate(['gate-config', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Registered Vehicles": this.router.navigate(['registered-vehicle', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Pricing Configuration": this.router.navigate(['pricing-config', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;
            case "Pass Configurations": this.router.navigate(['pass-config', this.clientId, this.premiseId, this.role], { relativeTo: this.route })
                break;

        }
    }
}
