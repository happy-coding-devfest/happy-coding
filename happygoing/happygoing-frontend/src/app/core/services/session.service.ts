import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(
        private router: Router
    ) {}

    setToken(token: string): void {
        localStorage.setItem('etudiant$esame', token);
    }

    getToken(): string | null {
        return localStorage.getItem('etudiant$esame');
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    logOut(): void {
        localStorage.removeItem('etudiant$esame');
        this.router.navigateByUrl('/auth');
        window.location.reload();
    }
}