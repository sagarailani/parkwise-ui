import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PricingService {

    constructor(private _http: HttpClient) { }

    createPricing(baseCost, baseTime, incrementCost, incrementTime, premiseId, configId): Observable<any> {
        let dataObj = {
            'active': true,
            'baseCost': baseCost,
            'baseTime': baseTime,
            'incrementCost': incrementCost,
            'incrementTime': incrementTime
        }

        return this._http.post(environment.apiBaseUrl + '/premise/' + premiseId + '/premiseConfiguration/' + configId + '/pricing', dataObj)
    }

    disablePricingConfig(premiseId, configId, pricingId) {
        return this._http.post(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration/" + configId + "/pricing/" + pricingId + "/disable", "");
    }

}
