import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _http: HttpClient) { }

    checkForUsername(username: string): Observable<any> {
        return this._http.get(environment.apiBaseUrl + "/user/isUnique?username=" + username)
    }

    getClients(): Observable<any> {
        return this._http.get(environment.apiBaseUrl + "/user/owners")
    }

    addUser(userData, role): Observable<{}> {
        console.log(userData)
        //mapping
        let dataObj = {
            'premiseId': userData.premiseName,
            'role': role,
            'username': userData.username,
            'password': userData.password
        }
        return this._http.post(environment.apiBaseUrl + "/user", dataObj)
    }

}
