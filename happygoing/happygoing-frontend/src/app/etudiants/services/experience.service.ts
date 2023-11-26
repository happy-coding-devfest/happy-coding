import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateExperienceModel, ExperienceModel, UpdateExperienceModel } from "../models/experience.model";

@Injectable()
export class ExperiencesService {
    constructor(
        private http: HttpClient
    ) {}

    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    }

    private _experiences$ = new BehaviorSubject<ExperienceModel[]>([]);
    get experiences$(): Observable<ExperienceModel[]> {
        return this._experiences$.asObservable();
    }

    lastExperiencesLoaded = 0;

    getExperiences(): void {
        if(Date.now() - this.lastExperiencesLoaded <= 180000) return;
        this.setLoadingStatus(true);
        this.http.get<ExperienceModel[]>(`${environment.apiUrl}/experiences/etudiants`).pipe(
            tap(experiences => {
                this.lastExperiencesLoaded = Date.now();
                this._experiences$.next(experiences);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }

    createExperience(donnees: CreateExperienceModel): void {
        this.setLoadingStatus(true);
        this.http.post(`${environment.apiUrl}/experiences/create`, donnees).pipe(
            switchMap(() => this.http.get<ExperienceModel[]>(`${environment.apiUrl}/experiences/etudiants`)),
            take(1),
            tap(experiences => {
                this._experiences$.next(experiences);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }

    updateExperience(donnees: UpdateExperienceModel): void {
        this.setLoadingStatus(true);
        this.experiences$.pipe(
            take(1),
            map(experiences => experiences
                .map(experience => experience.id === donnees.id ? {
                    ...experience,
                    nom: donnees.nom_experience,
                    lieu: donnees.lieu,
                    annee: donnees.annee,
                    description: donnees.description
                }: experience)),
                tap(experiences => this._experiences$.next(experiences)),
                switchMap(() => this.http.put(`${environment.apiUrl}/experiences/update`, donnees)),
                tap(() => this.setLoadingStatus(false))
        ).subscribe();
    }

    deleteExperience(id: number): void {
        this.setLoadingStatus(true);
        this.http.delete(`${environment.apiUrl}/experiences/delete/${id}`).pipe(
            switchMap(() => this.experiences$),
            take(1),
            map(experiences => experiences.filter(experience => experience.id !== id)),
            tap(experiences => {
                this._experiences$.next(experiences);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }
}
