import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class PremiseService {

    constructor(private _http: HttpClient) { }

    getPremises(clientId: number): Observable<{}> {
        return this._http.get(environment.apiBaseUrl + "/premise/client/" + clientId)
    }

    createNewPremise(clientId, premiseName): Observable<any> {
        let dataObj = {
            'client': {
                'id': clientId
            },
            'name': premiseName
        }

        return this._http.post(environment.apiBaseUrl + "/premise", dataObj);
    }

}
