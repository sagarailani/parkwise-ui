import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: string[] = [
        "sagarailani",
        "vinayak.p",
        "manish.b"
    ]

    constructor() { }

    checkForUsername(username): boolean {
        return this.users.includes(username);
    }

}
