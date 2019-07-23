import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegisteredVehicleService {

    constructor(private _http: HttpClient) { }

    registerVehicle(premiseId, premiseConfigId, ownerName, vehicleNumber): Observable<any> {
        let dataObj = {
            'ownerName': ownerName,
            'vehicleNumber': vehicleNumber,
        }

        return this._http.post(environment.apiBaseUrl + "/premise/" + premiseId + "/premiseConfiguration/" + premiseConfigId + "/registered/vehicle", dataObj)
    }

}
