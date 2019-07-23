import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PremiseConfigService {

    constructor(private _http: HttpClient) { }

    getAllConfigs(premiseId): Observable<any> {
        return this._http.get(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration");
    }

    getRegularConfigs(premiseId): Observable<any> {
        let regConfig = [];
        this.getAllConfigs(premiseId)
            .subscribe((configs) => {
                for (let config of configs) {
                    if (config['entryType'] === 'Regular') {
                        regConfig.push(config);
                    }
                }
            })
        return of(regConfig);
    }

}
