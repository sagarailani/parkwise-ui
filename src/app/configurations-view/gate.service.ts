import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class GateService {

    constructor(private _http: HttpClient) { }

    addGateForPremise(premiseId, gateName): Observable<any> {
        return this._http.post(environment.apiBaseUrl + "/premise/" + premiseId + "/gate", gateName);
    }
}
