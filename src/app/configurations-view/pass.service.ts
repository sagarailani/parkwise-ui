import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PassService {

    constructor(private _http: HttpClient) { }

    createPassConfig(days, duration, price, premiseId, configId): Observable<any> {
        let dataObj = {
            "premiseConfiguration": {
                "id": configId,
            },
            "numOfDays": days,
            "numOfHours": duration,
            "price": price
        }
        return this._http.post(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration/" + configId + "/passConfig", dataObj);
    }

}
