import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {
    user = { 'username': '' };
    question = {'title': '',
                'description' : '',
                'id': '',
                'tags': [],
                'user': ''
                };

    constructor(private _http: HttpClient) {
    }
    postQuestion(question: any) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        question['username'] = this.user.username;
        const body = JSON.stringify(question);
        console.log(body);
        return this._http.post(`http://localhost:3000/addQuestion`, body, { headers: headers });
    }
    getQuestion(url): Observable<any[]> {
        return this._http.get<any[]>(url);
    }
    getAnswer(url, id){
        const temp = {};
        temp['_id'] = id;
        return this._http.post<any[]>(url, temp);
    }
    postAnswer(url, data) {
        return this._http.post(url, data);
    }
    userlogin(usr: any) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        // const body = JSON.stringify(usr);
        // console.log(body);
        return this._http.post(`http://localhost:3000/checkLogin`, usr);
    }

    registerUser(reusr: any) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        const body = JSON.stringify(reusr);
        console.log(body);
        return this._http.post(`http://localhost:3000/register`, body, { headers: headers });
    }

}
