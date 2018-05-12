import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {
    constructor(private _http: HttpClient) {
    }
    postQuestion(question: any) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        const body = JSON.stringify(question);
        console.log(body);
        return this._http.post(`http://localhost:3000/addQuestion`, body, { headers: headers });
    }
    getQuestion(url): Observable<any[]> {
        return this._http.get<any[]>(url);
    }
    getAnswer(url, id) {
        return this._http.put(url, id);
    }

}
