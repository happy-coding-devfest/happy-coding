import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ForgotPasswordModel } from "../models/auth.model";


@Injectable()
export class ForgotpassService {
    constructor(
        private http: HttpClient
    ) {}

    sendEmail(donnees: ForgotPasswordModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/etudiants/update-forgot-password`, 
            donnees,
            {observe: 'body'}
        );
    }
}
