import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PremiseConfigurationService } from '../premise-configuration.service';
@Component({
    selector: 'app-entry-exit',
    templateUrl: './entry-exit.component.html',
    styleUrls: ['./entry-exit.component.css'],
    animations: [
        trigger('slideUpDown', [
            transition(':enter', [
                style({ height: '0em' }),
                animate('200ms ease-in', style({ height: '4em' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ height: '0em' }))
            ])
        ])
    ],
})
export class EntryExitComponent implements OnInit {

    @Input() type: string;
    @Input() areConfigurationsAvailable: boolean;
    showConfigurations: boolean = false;

    clientId;
    premiseId;
    role;

    configurations: {}[];



    constructor(private premiseConfigurationService: PremiseConfigurationService) { }

    ngOnInit() {
        this.getConfigurations();
        console.log(this.configurations);
    }

    showEntryTypeConfigurations() {
        this.showConfigurations = !this.showConfigurations;
    }

    getConfigurations() {
        this.premiseConfigurationService.getConfigurations()
            .subscribe(configurations => this.configurations = configurations);
        // console.log(this.configurations);
    }
}
