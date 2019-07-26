import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PremiseConfigService {

    eventSubject: Subject<any> = new Subject();

    constructor(private _http: HttpClient) { }

    getAllConfigs(premiseId): Observable<any> {
        return this._http.get(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration");
    }

    getRegularConfigs(premiseId) {
        let regConfig = [];
        this.getAllConfigs(premiseId)
            .subscribe((configs) => {
                for (let config of configs) {
                    if (config['entryType'] === 'Regular' || config['entryType'] === 'REGULAR') {
                        regConfig.push(config);
                    }
                }
                console.log(regConfig)
                this.eventSubject.next(regConfig)
            })
    }

    createRegularConfig(maxCount: number, vehicleType: string, valet: boolean, registration: boolean, pass: boolean, premiseId: number, clientId: number): Observable<any> {

        let dataObj = {
            "active": true,
            "entryType": "REGULAR",
            "maxCount": maxCount,
            "passAvailable": pass,
            "registrationRequired": registration,
            "valetAvailable": valet,
            "vehicleType": vehicleType,
        }

        return this._http.post(environment.apiBaseUrl + '/premise/' + premiseId + '/premiseConfiguration', dataObj)
    }

    createTempConfig(allottedTime: number, premiseId: number, clientId: number): Observable<any> {

        let dataObj = {
            'active': true,
            'incrementPricing': {
                'active': true,
                'baseTime': allottedTime
            },
            "maxCount": 100,
            'entryType': 'TEMPORARY',
        }
        return this._http.post(environment.apiBaseUrl + '/premise/' + premiseId + '/premiseConfiguration', dataObj)
    }

    disablePremiseConfiguration(premiseId, configId) {

    }

    updatePremiseRegularConfig(maxCount: number, vehicleType: string, valet: boolean, registration: boolean, pass: boolean, premiseId: number, configId: number): Observable<any> {
        let dataObj = {
            "active": true,
            "entryType": "REGULAR",
            "maxCount": maxCount,
            "passAvailable": pass,
            "registrationRequired": registration,
            "valetAvailable": valet,
            "vehicleType": vehicleType,
        }

        return this._http.put(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration/" + configId, dataObj);
    }

    updatePremiseRegularConfigWithPrice(maxCount: number, vehicleType: string, valet: boolean, registration: boolean, pass: boolean, premiseId: number, pricingId: number, configId: number): Observable<any> {
        let dataObj = {
            "active": true,
            "entryType": "REGULAR",
            "maxCount": maxCount,
            "passAvailable": pass,
            "registrationRequired": registration,
            "valetAvailable": valet,
            "vehicleType": vehicleType,
            'incrementPricing': {
                'active': true,
                'id': pricingId,
            }
        }

        return this._http.put(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration/" + configId, dataObj);
    }

    updatePremiseTempConfig(allottedTime: number, premiseId: number, configId: number, pricingId: number): Observable<any> {
        let dataObj = {
            'active': true,
            'incrementPricing': {
                'id': pricingId,
                'active': true,
                'baseTime': allottedTime
            },
            'entryType': 'TEMPORARY',
        }
        return this._http.put(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration/" + configId, dataObj)
    }
}
