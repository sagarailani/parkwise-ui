import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PremiseConfigurationService {

    configurations: {}[] = [
        {
            'entryName': 'Regular',
            'vehicleTypes': [
                {
                    'vehicleType': '2 wheeler',
                    'slots': 20,
                    'valet': false
                },
                {
                    'vehicleType': '4 wheeler',
                    'slots': 10,
                    'valet': true
                }
            ]
        },
        {
            'entryName': 'Temp',
            'vehicleTypes': [
                {
                    'vehicleType': '2 wheeler',
                    'valet': false
                },
                {
                    'vehicleType': '4 wheeler',
                    'valet': false
                }
            ]
        },
    ]

    constructor() { }

    getConfigurations(): Observable<{}[]> {
        return of(this.configurations);
    }
}
