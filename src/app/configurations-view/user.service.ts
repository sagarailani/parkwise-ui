import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: string[] = [
        "sagarailani",
        "vinayak.p",
        "manish.b"
    ]

    constructor(private _http: HttpClient) { }

    checkForUsername(username: string): Observable<any> {
        return this._http.get("http://192.168.30.100:8080/user/isUnique?username=" + username)
    }

    addUser(userData, role): Observable<{}> {
        console.log(userData)
        // console.log(userData.premiseName)
        let dataObj = {
            'premiseId': userData.premiseName,
            'role': role,
            'username': userData.username,
            'password': userData.password
        }
        return this._http.post("http://192.168.30.100:8080/user", dataObj)
    }

}
