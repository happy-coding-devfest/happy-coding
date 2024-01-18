import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { UserModel } from "../models/user.model";

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) {}

    private _apropos!: UserModel;

    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    }

    private _apropos$ = new BehaviorSubject<UserModel>(this._apropos);
    get apropos$(): Observable<UserModel> {
        return this._apropos$.asObservable();
    }
    
    lastAproposLoaded = 0;

    private ctrlImageLink(apropos: UserModel): UserModel {            
        if(!apropos.pdp) apropos.pdp = `${environment.apiUrl}/etudiants_pdp/user.png`;
        if(!apropos.pdc) apropos.pdc = `${environment.apiUrl}/etudiants_pdc/user.png`;
        return apropos;
    }

    getUser(): void {
        if(Date.now() - this.lastAproposLoaded <= 180000) return;
        this.setLoadingStatus(true);
        this.http.get<UserModel>(`${environment.apiUrl}/etudiants`).pipe(
            map(apropos => this.ctrlImageLink(apropos)),
            tap(apropos => {
                this.lastAproposLoaded = Date.now();
                this._apropos$.next(apropos);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }
}
