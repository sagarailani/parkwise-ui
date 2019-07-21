import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientPremiseService {

    client: {}[] = [
        {
            'clientId': 1,
            'clientName': 'Birla Group'
        },
        {
            'clientId': 2,
            'clientName': 'Lodha Group'
        },
        {
            'clientId': 3,
            'clientName': 'ABC Group'
        }
    ]

    premises: {}[] = [
        {
            'clientId': 1,
            'premiseId': 1,
            'premiseName': 'Premise 1'
        },
        {
            'clientId': 1,
            'premiseId': 2,
            'premiseName': 'Premise 2'
        },
        {
            'clientId': 2,
            'premiseId': 3,
            'premiseName': 'Premise 3'
        },
        {
            'clientId': 2,
            'premiseId': 4,
            'premiseName': 'Premise 4'
        },
        {
            'clientId': 3,
            'premiseId': 5,
            'premiseName': 'Premise 5'
        },
        {
            'clientId': 3,
            'premiseId': 6,
            'premiseName': 'Premise 6'
        },
    ]


    constructor() { }

    getClients(): Observable<{}[]> {
        return of(this.client);
    }

    getPremiseForClient(clientId: number): any {
        return of(this.premises.filter((obj: any) => {
            // console.log("Obj client id: " + typeof (obj['clientId']))
            // console.log("client id: " + typeof (clientId))
            return obj.clientId == clientId;
        }))
    }
}
