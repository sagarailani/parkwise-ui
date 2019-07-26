import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class VehicleService {

    constructor(
        private _http: HttpClient
    ) { }

    makeEntry(vehicleNumber, valet, workerId, premiseId, configId, gateId): Observable<any> {
        console.log(valet)
        console.log(typeof (valet))
        let dataObj = {
            "vehicleNumber": vehicleNumber,
            "locationRequested": valet,
            "workerId": workerId,
            "gateId": gateId
        }
        return this._http.post(environment.apiBaseUrl + '/premise/' + premiseId + "/premiseConfiguration/" + configId + "/vehicle/entry", dataObj)
    }


    makeExit(premiseId, gateId, vehicleNumber): Observable<any> {
        return this._http.post(environment.apiBaseUrl + '/premise/' + premiseId + '/gate/' + gateId + '/vehicle/' + vehicleNumber + '/exit', '')
    }
}
