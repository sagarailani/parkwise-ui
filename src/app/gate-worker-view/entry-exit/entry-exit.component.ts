import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PremiseConfigService } from 'src/app/configurations-view/premise-config.service';
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

    @Input() clientId;
    @Input() premiseId;
    @Input() role;
    @Input() workerId;
    @Input() gateId;

    showConfigurations: boolean = false;
    tempConfigId;
    configurations: {}[];

    entryTypes = [];
    vehicleTypes: {}[] = [];

    constructor(
        private _premiseConfigService: PremiseConfigService
    ) { }

    ngOnInit() {
        if (this.type === 'Entry') {
            this._premiseConfigService.getAllConfigs(this.premiseId)
                .subscribe((configs) => {
                    this.configurations = configs;
                    console.log(configs)
                    for (let config in configs) {
                        this.processConfigurations(configs[config])
                    }
                    // console.log(this.entryTypes)
                    // console.log(this.vehicleTypes)
                })
        }
        console.log("worker id " + this.workerId)
        console.log("type " + this.type)
        console.log("role  " + this.role)
        console.log("client id " + this.clientId)
        console.log("premise id " + this.premiseId)
        console.log("gate id " + this.gateId)
    }

    showEntryTypeConfigurations() {
        this.showConfigurations = !this.showConfigurations;
    }

    processConfigurations(config) {
        // console.log(config)
        // console.log("vehicle types:")
        // console.log(this.vehicleTypes)
        // console.log(this.entryTypes)
        if (config.entryType === 'TEMPORARY' && !this.entryTypes.includes('Temporary')) {
            this.entryTypes.push('Temporary');
            this.tempConfigId = config.id;
        }
        if (config.entryType === 'REGULAR') {
            if (!this.entryTypes.includes('Regular')) {
                this.entryTypes.push('Regular')
            }
            let configObj = {
                'vehicleType': config.vehicleType,
                'slots': config.maxCount,
                'configId': config.id,
                'valet': config.valetAvailable,
            }
            this.vehicleTypes.push(configObj);
        }
    }

}
