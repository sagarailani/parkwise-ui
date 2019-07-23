import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PremiseService {

    constructor(private _http: HttpClient) { }

    getPremises(clientId: number): Observable<{}> {
        return this._http.get("http://192.168.30.100:8080/premise/client/" + clientId)
    }

}
