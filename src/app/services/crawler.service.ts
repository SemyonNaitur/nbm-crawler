import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface ApiResponse {
    status: string;
    message: string;
    data?: any;
    [prop: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class CrawlerService {

    protected apiUrl: string;

    constructor(private http: HttpClient) {
        let apiUrl = '/api/nbm-crawler';
        if (location.hostname == 'localhost') {
            apiUrl = 'http://localhost/mvc' + apiUrl;
        } else {
            apiUrl = 'https://semnait-mvc.infinityfreeapp.com' + apiUrl;
        }
        this.apiUrl = apiUrl;
    }

    getSites(): Observable<string[]> {
        return this.http.get<ApiResponse>(this.apiUrl + '?method=getSites')
            .pipe(
                map(res => this.extractData<string[]>(res)),
                catchError(this.handleError<string[]>('getSites', []))
            );
    }

    getLinks(site: string): Observable<string[]> {
        return this.http.get<ApiResponse>(`${this.apiUrl}?method=getLinks&site=${site}`)
            .pipe(
                map(res => this.extractData<string[]>(res)),
                catchError(this.handleError<string[]>('getLinks', []))
            );
    }

    protected extractData<T>(res: ApiResponse): T {
        if (res.status == 'OK') {
            return res.data;
        }
        throw new Error(`API Error: ${res.message}`);
    }

    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
