import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LogInService {

    constructor(private _http: HttpClient) { }

    getResponse(username, password): Observable<any> {
        let localObject = {
            "username": username,
            "password": password
        };
        console.log(environment.apiBaseUrl)
        console.log(localObject['password'])
        return this._http.post(environment.apiBaseUrl + '/login', localObject);
    }

    logOut() {
        localStorage.removeItem('token')
    }
}