import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(private _http: HttpClient) { }

    getClients(): Observable<{}> {
        return this._http.get("http://192.168.30.100:8080/client")
    }

}
