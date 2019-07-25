import { Injectable } from '@angular/core';
import { decode } from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    public getToken(): string {
        return localStorage.getItem('token')
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return true;
    }

}
