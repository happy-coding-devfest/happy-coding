import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthModel } from "../models/auth.model";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient
    ) {}

    logIn(donnees: AuthModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/auth/etudiants`,
            donnees, 
            {observe: 'body'}
        );
    }
}
