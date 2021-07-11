import { HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginResponse } from '../models/LoginResponse';
import { SurveyResponse } from '../models/SurveyResponse';
import { ApiService } from './api.service'
import { UserService } from './user.service';

const httpOptions = {
    headers: new HttpHeaders({
        Authorization: 'Bearer G0Kg8qEubRVjCo64RGd810O5A4f9eS',
    }),
}

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    constructor(private http: ApiService, private cookieService: UserService) { }


    getSurveyQuestions(url: string): Promise<any> {
        const accessToken = this.cookieService.getSessionCookie().access_token;
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${accessToken}`,
            }),
        };

        return this.http.get(url, httpOptions);

    }

    submitAnswers(url: string, payload: SurveyResponse[]): Promise<any> {
        const accessToken = this.cookieService.getSessionCookie().access_token;
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${accessToken}`,
            }),
        };
        return this.http.post(url, payload, httpOptions);
    }
}
