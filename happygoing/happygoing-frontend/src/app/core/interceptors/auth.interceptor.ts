import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private sessionService: SessionService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers =  new HttpHeaders()
            .append('Authorization', `Bearer ${this.sessionService.getToken()}`);
        const modifiedReq = req.clone({headers});
        return next.handle(modifiedReq);
    }
}
