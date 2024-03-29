import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(private _http: HttpClient) { }

    getClients(): Observable<{}> {
        return this._http.get(environment.apiBaseUrl + "/client")
    }

    addClient(name, username, password): Observable<{}> {
        let dataObj = {
            'name': name,
            'username': username,
            'password': password
        }
        return this._http.post(environment.apiBaseUrl + '/user/owner', dataObj)
    }
}
